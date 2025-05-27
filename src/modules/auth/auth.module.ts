import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config/envs';
import { AuthService } from './domain/services/auth.service';
import { JwtStrategy } from './infrastructure/jwt/jwt.strategy';
import { CryptoService } from './domain/interfaces/crypto.service';
import { CompanyModules } from '../company/company.modules';
import { AccountUserModule } from '../account/accountUser.modules';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: envs.jwt_secret,
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(()=>CompanyModules) ,
    forwardRef(()=>AccountUserModule) ,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, CryptoService],
  exports: [AuthService, CryptoService]
})
export class AuthModule { }
