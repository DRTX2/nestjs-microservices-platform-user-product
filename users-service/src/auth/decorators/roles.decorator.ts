import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY='roles';

export const Roles=(...roles:string[])=>SetMetadata(ROLES_KEY,roles);//set metadata for routes or classes, like save data inside server to read it in another guard or interceptor