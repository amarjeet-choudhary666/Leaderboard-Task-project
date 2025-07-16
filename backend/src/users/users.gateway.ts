import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class UsersGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('UsersGateway');

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  emitUserCreated(user: any) {
    this.server.emit('userCreated', user);
  }

  // WebSocket event handlers for real-time user data

  async handleCreateUser(client: Socket, createUserDto: any) {
    try {
      const user = await this.usersService.createUser(createUserDto);
      this.emitUserCreated(user);
      client.emit('createUserSuccess', user);
    } catch (error) {
      client.emit('createUserError', error.message);
    }
  }

  async handleGetAllUsers(client: Socket) {
    try {
      const users = await this.usersService.GetAllUsers();
      client.emit('getAllUsersSuccess', users);
    } catch (error) {
      client.emit('getAllUsersError', error.message);
    }
  }

  async handleGetUserById(client: Socket, id: string) {
    try {
      const user = await this.usersService.getUserById(id);
      client.emit('getUserByIdSuccess', user);
    } catch (error) {
      client.emit('getUserByIdError', error.message);
    }
  }
}
