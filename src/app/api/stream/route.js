import { NextResponse } from "next/server";

const problemsList = [];
const streamControllers = new Set();

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const wrappedController = {
        enqueue: (event, data) => {
          try {
            controller.enqueue(
              `event: ${event}\n` + `data: ${JSON.stringify(data)}\n\n`
            );
          } catch (error) {
            streamControllers.delete(wrappedController);
          }
        },
      };

      streamControllers.add(wrappedController);
      wrappedController.enqueue("status", "running 🟢");
      wrappedController.enqueue("problem", problemsList);
    },
    cancel() {
      streamControllers.delete(this.wrappedController);
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
  if (streamControllers.size > 0) {
    problemsList.push(ip);
    const activeControllers = new Set(streamControllers);

    activeControllers.forEach((controller) => {
      controller.enqueue("problem", problemsList);
    });
  } else {
    console.warn("no clients connected to send data");
  }
}
