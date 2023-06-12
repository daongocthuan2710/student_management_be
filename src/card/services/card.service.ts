import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CardRepository } from '../repositories/card.repository';
import {
  CreateCardDto,
  UpdateAllCardDto,
  UpdateCardDto,
} from '../dto/card.dto';

@Injectable()
export class CardService {
  constructor(private readonly cardRepository: CardRepository) {}

  async getAllCards(query) {
    const sort = { position: 1 };
    return this.cardRepository.getByCondition(query || {}, sort);
  }

  async getAllCardsByListId(list_id: string) {
    const sort = { position: 1 };
    return this.cardRepository.getAllCardsByListId(list_id, sort);
  }

  async getCardById(id: string) {
    const card = this.cardRepository.findById(id);

    if (card) {
      throw new HttpException(card, HttpStatus.OK);
    } else {
      throw new HttpException('Card not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateAllCard(id: string, card: UpdateAllCardDto) {
    return await this.cardRepository.findOneAndReplace(id, card);
  }

  async updateCard(list_id: string, id: string, card: UpdateCardDto, query) {
    if (card.position != undefined && query.new_list_id != undefined) {
      await this.cardRepository.findByConditionAndUpdate(
        {
          _id: { $ne: id },
          list_id: { $eq: query.new_list_id },
          position: { $gte: card.position },
        },
        {
          $inc: { position: 1 },
        },
      );

      await this.cardRepository.findByConditionAndUpdate(
        {
          _id: { $ne: id },
          list_id: { $eq: list_id },
          position: { $gt: card.position },
        },
        {
          $inc: { position: -1 },
        },
      );

      return await this.cardRepository.findByIdAndUpdate(id, {
        ...card,
        list_id: query.new_list_id,
      });
    }
    return await this.cardRepository.findByIdAndUpdate(id, {
      ...card,
    });
  }

  async createCard(card: CreateCardDto) {
    const response = await this.cardRepository.getAllCardsByListId(
      card.list_id,
    );
    card.position = response.length;
    return await this.cardRepository.create(card);
  }

  async deleteCard(id: string) {
    return this.cardRepository.deleteOne(id);
  }
}
