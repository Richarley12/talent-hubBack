import { createParamDecorator, ExecutionContext, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';

export const CompanyId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const companyId = request.user?.companyId;

    if (!companyId) {
      throw new HttpException('Token inválido o sin empresa asociada',HttpStatus.UNAUTHORIZED);
    }

    return companyId;
  },
);
