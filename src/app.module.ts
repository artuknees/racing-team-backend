import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import config from './config'; // llamo tambien al config aca

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      // configuracion general. traigo todo
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
