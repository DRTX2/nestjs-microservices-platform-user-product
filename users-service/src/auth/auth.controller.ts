import { Body, Controller, Get, NotFoundException, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt_auth.guard';
import { UsersService } from 'src/users/users.service';
import { toUserResponse } from 'src/users/mappers/user.mapper';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService,
        private readonly usersService:UsersService
    ){}

    @Post("register")
    register(@Body() dto:RegisterDto):Promise<AuthResponseDto>{
        return this.authService.register(dto);
    }

    @Post("login")
    login(@Body() dto:LoginDto):Promise<AuthResponseDto>{
        return this.authService.login(dto);
    }

    @Get("me")
    @UseGuards(JwtAuthGuard)
    async getProfile(@CurrentUser() user:{userId:string}){// takes just the userId destructuring the value from CurrentUser
        const fullUser=await this.usersService.findById(user.userId);
        if(!fullUser)
            throw new NotFoundException("User not found");
        
        return toUserResponse(fullUser);
    }
}
