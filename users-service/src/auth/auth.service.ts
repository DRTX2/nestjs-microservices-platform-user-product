import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(dto: RegisterDto) {
    const exist = await this.usersService.findByEmail(dto.email);
    if (exist) throw new ConflictException('Email already registered');
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });
    return this.signToken(user.id,user.role);
  }

  //  generate a jwt which accepts a subject(id) and user role
  signToken(sub:string,role:string){
    return {
        access_token: this.jwtService.sign({sub,role}, {expiresIn:'1h'}) // create a token with paramether payload
    }
  }
  

  async login(dto:LoginDto){
    const user = await this.usersService.findByEmail(dto.email);
    if(!user) throw new UnauthorizedException("Invalid credentials");
    
    const match = await bcrypt.compare(dto.password, user.password);
    if(!match) throw new UnauthorizedException("Invalid credentials");

    return this.signToken(user.id,user.role);
  }
}
