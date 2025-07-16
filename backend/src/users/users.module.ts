import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';

import { UsersGateway } from './users.gateway';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ])
    ],
    providers: [UsersService, UsersGateway],
    controllers: [UsersController],
    exports: [MongooseModule]
})
export class UsersModule {
}
