import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulesModule } from './modules/modules.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ModulesModule, SharedModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
