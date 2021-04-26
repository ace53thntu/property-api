import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { IAuthUser } from '@common/interfaces/auth-user.interface';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user as IAuthUser;
  },
);
