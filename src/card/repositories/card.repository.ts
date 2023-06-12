/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base.repository';
import { Card } from '../models/card.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CardRepository extends BaseRepository<Card> {
  constructor(
    @InjectModel('Card')
    private readonly cardModel: Model<Card>,
  ) {
    super(cardModel);
  }

  async getAllCardsByListId(list_id: string, sort?): Promise<Card[]> {
    return await this.getByCondition({ list_id: list_id }, sort);
  }
}
