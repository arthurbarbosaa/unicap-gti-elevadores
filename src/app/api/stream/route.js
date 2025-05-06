// stream/route.js
import { NextResponse } from "next/server";

// Use um armazenamento global para manter os controladores e clientes entre solicitações
// Isso pode ser um módulo separado ou um serviço externo em produção
// Importante: Esta é uma solução simplificada para demonstração
global.connections = global.connections || {
  controllers: new Set(),
  problemsList: [],
};

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const streamController = {
        id: Date.now().toString(), // Identificador único para cada conexão
        enqueue: (event, data) => {
          try {
            controller.enqueue(
              `event:${event}\n + data: ${JSON.stringify(data)}\n\n`
            );
          } catch (error) {
            global.connections.controllers.delete(streamController);
          }
        },
      };

      // Adicionar ao conjunto global de controladores
      global.connections.controllers.add(streamController);

      // Enviar o status inicial e a lista atual de problemas
      streamController.enqueue("status", "running 🟢");
      streamController.enqueue("problem", global.connections.problemsList);

      console.log(
        `Client connected: ${streamController.id}, Total clients: ${global.connections.controllers.size}`
      );
    },
    cancel() {
      // Remover o controlador quando a conexão for fechada
      global.connections.controllers.forEach((controller) => {
        if (controller.id === this.currentControllerId) {
          global.connections.controllers.delete(controller);
          console.log(
            `Client disconnected: ${controller.id}, Remaining clients: ${global.connections.controllers.size}`
          );
        }
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

export function notifyClients(ip) {
  if (global.connections.controllers.size > 0) {
    global.connections.problemsList.push(ip);

    // Notificar todos os clientes conectados
    global.connections.controllers.forEach((controller) => {
      controller.enqueue("problem", global.connections.problemsList);
    });

    console.log(
      `Notificação enviada para ${global.connections.controllers.size} clientes. IP: ${ip}`
    );
  } else {
    console.warn("No clients connected to send data");
  }
}