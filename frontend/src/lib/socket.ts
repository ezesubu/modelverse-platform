import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.API_URL || 'http://localhost:3001';

export const socket: Socket = io(SOCKET_URL, {
    transports: ['websocket'],
    autoConnect: false,
    reconnection: true,
});
