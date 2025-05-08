import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({isGlobal:true}),//ConfigModule allows to load vars from .env file, and forRoot({isGlobal:true}), helps to use that vars globaly
    JwtModule.registerAsync({// more secure than register, because this method waits for the .env load
      imports:[ConfigModule], // before use the service we need to charge the module and then we can interact with the service
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
