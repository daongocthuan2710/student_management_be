import { Module } from '@nestjs/common';

import { CardController } from './controllers/card.controller';
import { CardService } from './services/card.service';
import { CardRepository } from './repositories/card.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from './models/card.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Card',
        schema: CardSchema,
      },
    ]),
  ],
  controllers: [CardController],
  providers: [CardService, CardRepository],
})
export class CardModule {}
