import { Injectable, InternalServerErrorException, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import { UsersGateway } from './users.gateway';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @Inject(forwardRef(() => UsersGateway))
        private readonly usersGateway: UsersGateway,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
        const newUser = new this.userModel(createUserDto);
        const savedUser = await newUser.save();
        this.usersGateway.emitUserCreated(savedUser);
        return savedUser;
    }

    async GetAllUsers(): Promise<UserDocument[]> {
        return this.userModel.find().sort({ createdAt: -1 }).exec();
    }

    async getUserById(id: string): Promise<UserDocument> {
        const user = await this.userModel.findById(id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
}
