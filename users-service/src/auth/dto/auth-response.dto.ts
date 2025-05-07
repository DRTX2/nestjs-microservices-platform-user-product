import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class AuthResponse {
  user: UserResponseDto;
  access_token: string;
}
