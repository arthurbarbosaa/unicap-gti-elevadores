import { NextResponse } from "next/server";

const problemsList = [];
let streamController;

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      streamController = {
        enqueue: (event, data) => {
          controller.enqueue(
            `event: ${event}\n` + `data: ${JSON.stringify(data)}\n\n`
          );
        },
      };

      streamController.enqueue("status", "running 🟢");
    },
    cancel() {
      streamController = null;
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
  if (streamController) {
    problemsList.push(ip);
    streamController.enqueue("problem", problemsList);
  } else {
    console.warn("no clients connected to send data");
  }
}
