import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector:Reflector){}// reflector allows read intern metadata as from decorators

    canActivate(context: ExecutionContext): boolean { // executed any time when users try to entry in protected routes
        const requiredRoles=this.reflector.getAllAndOverride<string[]>(//overrides the metadata if per example we have a controller for users but certain methods will be used for admin users
            ROLES_KEY,[
                context.getHandler(),//get the first metadata finded in method or  in the class that matches with roles key
                context.getClass()
            ]
        ); 

        if(!requiredRoles) //non protected routes
            return true;

        const {user}=context.switchToHttp().getRequest();
        if(!requiredRoles.includes(user.role))
            throw new ForbiddenException()
        return true;
    }
}