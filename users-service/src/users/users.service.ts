import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user/user';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(userData:Partial<User>): Promise<User>{
    const user=this.userRepository.create(userData);// const user = new User();
    return this.userRepository.save(user);// interact with db to save or update(if the user has id)
  }
  async findByEmail(email:string): Promise<User | null>{
    return this.userRepository.findOne( {where:{email}});
  }
  async findById(id:string):Promise<User | null>{
    return this.userRepository.findOne({where:{id}});
  }
}
