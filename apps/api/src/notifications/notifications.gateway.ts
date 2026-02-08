import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'notifications',
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    
    // Join user-specific room
    const userId = client.handshake.query.userId as string;
    if (userId) {
      client.join(`user:${userId}`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('subscribe:project')
  handleSubscribeProject(client: Socket, projectId: string) {
    client.join(`project:${projectId}`);
    return { status: 'subscribed', projectId };
  }

  @SubscribeMessage('unsubscribe:project')
  handleUnsubscribeProject(client: Socket, projectId: string) {
    client.leave(`project:${projectId}`);
    return { status: 'unsubscribed', projectId };
  }

  // Methods to emit notifications
  notifyUser(userId: string, notification: any) {
    this.server.to(`user:${userId}`).emit('notification', notification);
  }

  notifyProject(projectId: string, event: string, data: any) {
    this.server.to(`project:${projectId}`).emit(event, data);
  }
}
