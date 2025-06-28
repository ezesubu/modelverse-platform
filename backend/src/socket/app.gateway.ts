import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        console.log(`✅ Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`❌ Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('ping')
    handlePing(client: Socket, payload: any): string {
        console.log(`📡 Ping from ${client.id}`, payload);
        return 'pong';
    }

    broadcastModelUpdate(data: any) {
        console.log('📢 Broadcasting model update:', data);
        this.server.emit('modelUpdated', data);
    }
}
