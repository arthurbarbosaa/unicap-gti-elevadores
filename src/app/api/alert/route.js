import { NextResponse } from "next/server";
import { notifyClients } from "../stream/route";

const AUTHORIZED_IPS = ["192.168.1.100", "192.168.1.101", "192.168.1.102"];

export async function POST(req) {
  const { ip } = await req.json();

  if (!ip) {
    return NextResponse.json({ message: "IP inválido" }, { status: 400 });
  }

  if (!AUTHORIZED_IPS.includes(ip)) {
    return NextResponse.json({ message: "IP não autorizado" }, { status: 403 });
  }

  console.log("new ip recived:", ip);
  notifyClients(ip);

  return NextResponse.json({ ip: ip }, { status: 200 });
}
