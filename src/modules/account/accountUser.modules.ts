import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaAccountUser } from './infrastructure/repositories/prisma-accountUser.repository';

@Module({
    imports:[forwardRef(()=>AuthModule)],
    providers: [
        {
          provide: 'AccountUserRepository',
          useClass: PrismaAccountUser,
        },
      ],
      exports: ['AccountUserRepository'],
})
export class AccountUserModule {}
