import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user/user';
import { JwtAuthGuard } from 'src/auth/guards/jwt_auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // prepare table who creates he Repository<User> and enable it to inject that in the module
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService] // to use the service by other modules that import this module
})
export class UsersModule {}
