import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

export function socketUrl(): string {
  return (import.meta.env.VITE_SOCKET_URL as string | undefined) ?? "http://localhost:3001";
}

export function getSocket(): Socket {
  if (!socket) {
    socket = io(socketUrl(), { autoConnect: true });
  }
  return socket;
}
