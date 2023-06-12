import { Module } from '@nestjs/common';
import { ListController } from './controllers/list.controller';
import { ListService } from './services/list.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListSchema } from './models/list.model';
import { ListRepository } from './repositories/list.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'List',
        schema: ListSchema,
      },
    ]),
  ],
  controllers: [ListController],
  providers: [ListService, ListRepository],
})
export class ListModule {}
