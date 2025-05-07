import { UserRole } from "../entities/user/user";

export class UserResponseDto{
    id:string;
    username:string;
    email:string;
    role:UserRole;
    created_at:Date;
}