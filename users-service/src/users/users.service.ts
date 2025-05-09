import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user/user';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData); // const user = new User();
    return this.userRepository.save(user); // interact with db to save or update(if the user has id)
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);
    if (!user) return null;
    Object.assign(user, updateUserDto); //mix data
    return this.userRepository.save(user);
  }

  async deactivate(id: string): Promise<boolean> {
    const userToDelete =await this.findById(id);
    if (!userToDelete) return false;

    userToDelete.isActive=false;
    await this.userRepository.save(userToDelete);
    return true;
  }
}
