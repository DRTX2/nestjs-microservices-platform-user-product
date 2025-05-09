import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class AuthResponseDto {
  user: UserResponseDto;
  access_token: string;
}
