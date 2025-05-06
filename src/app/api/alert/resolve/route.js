import { NextResponse } from "next/server";

export async function POST(req) {
  const { ip } = await req.json();

  if (!ip) {
    return NextResponse.json({ message: "IP inválido" }, { status: 400 });
  }

  // Remove o IP da lista global de problemas
  global.connections.problemsList = global.connections.problemsList.filter(
    (problem) => problem !== ip
  );

  // Notifica todos os clientes sobre a atualização
  global.connections.controllers.forEach((controller) => {
    controller.enqueue("problem", global.connections.problemsList);
  });

  return NextResponse.json(
    { message: "IP removido com sucesso" },
    { status: 200 }
  );
}