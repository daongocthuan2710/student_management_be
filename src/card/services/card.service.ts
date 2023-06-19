import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CardRepository } from '../repositories/card.repository';
import {
  CreateCardDto,
  UpdateAllCardDto,
  UpdateCardDto,
  UpdateManyCardDto,
} from '../dto/card.dto';

@Injectable()
export class CardService {
  constructor(private readonly cardRepository: CardRepository) {}

  async getAllCards(query) {
    const { _sort = '', _order = '', ...restOfQuery } = query;
    const sortByOrder = {};
    const order = {
      asc: 1,
      desc: -1,
    };
    if (_sort != '') {
      sortByOrder[`${_sort}`] = order[`${_order}`] || 1;
    }

    return await this.cardRepository.getByCondition(
      restOfQuery || {},
      sortByOrder,
    );
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

  async updateManyCard(data: UpdateManyCardDto) {
    if (data.old_list_id === data.body.list_id) {
      if (data.body.position > data.params.old_position) {
        await this.cardRepository.updateMany(
          {
            _id: { $ne: data.id },
            list_id: { $eq: data.old_list_id },
            $and: [
              { position: { $lte: data.body.position } },
              { position: { $gt: data.params.old_position } },
            ],
          },
          {
            $inc: { position: -1 },
          },
        );
      } else {
        await this.cardRepository.updateMany(
          {
            _id: { $ne: data.id },
            list_id: { $eq: data.old_list_id },
            $and: [
              { position: { $lt: data.params.old_position } },
              { position: { $gte: data.body.position } },
            ],
          },
          {
            $inc: { position: 1 },
          },
        );
      }

      await this.cardRepository.findByIdAndUpdate(data.id, data.body);

      const cards = await this.cardRepository.getAllCardsByListId(
        data.old_list_id,
        { position: 1 },
      );

      cards.forEach(async (card, index) => {
        await this.cardRepository.findByIdAndUpdate(card.id, {
          position: index,
        });
      });

      return cards;
    } else {
      await this.cardRepository.updateMany(
        {
          _id: { $ne: data.id },
          list_id: { $eq: data.old_list_id },
          position: { $gt: data.params.old_position },
        },
        {
          $inc: { position: -1 },
        },
      );

      const cardsOld = await this.cardRepository.getAllCardsByListId(
        data.old_list_id,
        { position: 1 },
      );

      cardsOld.forEach(async (card, index) => {
        await this.cardRepository.findByIdAndUpdate(card.id, {
          position: index,
        });
      });

      await this.cardRepository.updateMany(
        {
          _id: { $ne: data.id },
          list_id: { $eq: data.body.list_id },
          position: { $gte: data.body.position },
        },
        {
          $inc: { position: 1 },
        },
      );
      await this.cardRepository.findByIdAndUpdate(data.id, data.body);

      const cardsNew = await this.cardRepository.getAllCardsByListId(
        data.body.list_id,
        { position: 1 },
      );

      cardsNew.forEach(async (card, index) => {
        await this.cardRepository.findByIdAndUpdate(card.id, {
          position: index,
        });
      });

      return cardsNew;
    }
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
