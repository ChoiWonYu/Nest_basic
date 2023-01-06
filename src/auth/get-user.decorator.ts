import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const getUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
//커스텀 데커레이터 생성
