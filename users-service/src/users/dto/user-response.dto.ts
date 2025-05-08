import { Expose } from "class-transformer";
import { UserRole } from "../entities/user/user";

export class UserResponseDto{
    @Expose()
    id:string;
    @Expose()
    username:string;
    @Expose()
    email:string;
    @Expose()
    role:UserRole;
    @Expose()
    created_at:Date;
}