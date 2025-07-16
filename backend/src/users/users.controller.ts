import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.createUser(createUserDto);
      return {
        message: 'User created successfully',
        data: user,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Get()
  async getAllUsers() {
    try {
      const users = await this.usersService.GetAllUsers();
      return {
        message: 'All users fetched',
        data: users,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      const user = await this.usersService.getUserById(id);
      return {
        message: 'User found',
        data: user,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to get user');
    }
  }
}
