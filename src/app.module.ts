import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListModule } from './list/list.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CardModule } from './card/card.module';
import { BaseRepository } from './base.repository';

@Module({
  imports: [
    ListModule,
    CardModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      // useNewUrlParser: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, BaseRepository],
})
export class AppModule {}
