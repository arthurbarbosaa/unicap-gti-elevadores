import { NextResponse } from "next/server";
import { notifyClients } from "../stream/route";

export async function POST(req) {
  const { ip } = await req.json();

  if (!ip) {
    return NextResponse.json({ message: "IP inválido" }, { status: 400 });
  }

  console.log("new ip recived:", ip);
  notifyClients(ip);

  return NextResponse.json({ ip: ip }, { status: 200 });
}
