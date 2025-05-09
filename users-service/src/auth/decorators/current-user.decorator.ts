import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//creates a custom decorator, using a context and managing data from request

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest(); // transform context to a classic http request of express; When a guard like AuthGuard('jwt') is correctly verificated the returned value is injected to the request, ...so
    return request.user; // = validate(payload);
  },
);
