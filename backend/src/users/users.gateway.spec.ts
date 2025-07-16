import { Test, TestingModule } from '@nestjs/testing';
import { UsersGateway } from './users.gateway';
import { UsersService } from './users.service';
import { Server, Socket } from 'socket.io';

describe('UsersGateway', () => {
  let gateway: UsersGateway;
  let usersService: UsersService;
  let mockServer: Partial<Server>;
  let mockClient: Partial<Socket>;

  beforeEach(async () => {
    mockServer = {
      emit: jest.fn(),
    };

    mockClient = {
      id: 'client1',
      emit: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersGateway,
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
            GetAllUsers: jest.fn(),
            getUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    gateway = module.get<UsersGateway>(UsersGateway);
    usersService = module.get<UsersService>(UsersService);
    gateway.server = mockServer as Server;

    gateway.emitUserCreated = jest.fn();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('handleCreateUser', () => {
    it('should create user and emit events on success', async () => {
      const userDto = { name: 'John' };
      const createdUser = { id: '1', name: 'John' };
      (usersService.createUser as jest.Mock).mockResolvedValue(createdUser);

      await gateway.handleCreateUser(mockClient as Socket, userDto);

      expect(usersService.createUser).toHaveBeenCalledWith(userDto);
      expect(gateway.emitUserCreated).toHaveBeenCalledWith(createdUser);
      expect(mockClient.emit).toHaveBeenCalledWith('createUserSuccess', createdUser);
    });

    it('should emit error event on failure', async () => {
      const userDto = { name: 'John' };
      const error = new Error('Failed to create user');
      (usersService.createUser as jest.Mock).mockRejectedValue(error);

      await gateway.handleCreateUser(mockClient as Socket, userDto);

      expect(mockClient.emit).toHaveBeenCalledWith('createUserError', error.message);
    });
  });

  describe('handleGetAllUsers', () => {
    it('should get all users and emit success event', async () => {
      const users = [{ id: '1', name: 'John' }];
      (usersService.GetAllUsers as jest.Mock).mockResolvedValue(users);

      await gateway.handleGetAllUsers(mockClient as Socket);

      expect(usersService.GetAllUsers).toHaveBeenCalled();
      expect(mockClient.emit).toHaveBeenCalledWith('getAllUsersSuccess', users);
    });

    it('should emit error event on failure', async () => {
      const error = new Error('Failed to get users');
      (usersService.GetAllUsers as jest.Mock).mockRejectedValue(error);

      await gateway.handleGetAllUsers(mockClient as Socket);

      expect(mockClient.emit).toHaveBeenCalledWith('getAllUsersError', error.message);
    });
  });

  describe('handleGetUserById', () => {
    it('should get user by id and emit success event', async () => {
      const user = { id: '1', name: 'John' };
      (usersService.getUserById as jest.Mock).mockResolvedValue(user);

      await gateway.handleGetUserById(mockClient as Socket, '1');

      expect(usersService.getUserById).toHaveBeenCalledWith('1');
      expect(mockClient.emit).toHaveBeenCalledWith('getUserByIdSuccess', user);
    });

    it('should emit error event on failure', async () => {
      const error = new Error('User not found');
      (usersService.getUserById as jest.Mock).mockRejectedValue(error);

      await gateway.handleGetUserById(mockClient as Socket, '1');

      expect(mockClient.emit).toHaveBeenCalledWith('getUserByIdError', error.message);
    });
  });
});
