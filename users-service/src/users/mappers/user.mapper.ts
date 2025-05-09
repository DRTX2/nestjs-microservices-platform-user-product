import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../dto/user-response.dto';
import { User } from '../entities/user/user';

export function toUserResponse(user: User): UserResponseDto {
  return plainToInstance(
    UserResponseDto, // target class, like: I wan't an instance for this class and its properties
    user, // entry object with key attributes
    {
    excludeExtraneousValues: true,// just includes properties declared explicitely with @Expose decorator
  });
}
