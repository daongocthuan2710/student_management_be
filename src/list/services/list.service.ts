import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateListDto,
  UpdateListDto,
  UpdateManyListDto,
} from '../dto/list.dto';
import { ListRepository } from '../repositories/list.repository';

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  async getAllLists(query) {
    const { _sort = '', _order = '', ...restOfQuery } = query;
    const sortByOrder = {};
    const order = {
      asc: 1,
      desc: -1,
    };
    if (_sort != '') {
      sortByOrder[`${_sort}`] = order[`${_order}`] || 1;
    }

    return await this.listRepository.getByCondition(
      restOfQuery || {},
      sortByOrder,
    );
  }

  async getListById(id: string) {
    const list = await this.listRepository.findById(id);

    if (list) {
      return list;
    } else {
      throw new HttpException('List not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateAllList(id: string, list: UpdateListDto) {
    return await this.listRepository.findOneAndReplace(id, list);
  }

  async updateAllManyList(lists: UpdateListDto[]) {
    return await this.listRepository.updateMany({}, lists);
  }

  async updateManyList(data: UpdateManyListDto) {
    return data;
    if (data.body.position > data.params.old_position) {
      await this.listRepository.updateMany(
        {
          _id: { $ne: data.id },
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
      await this.listRepository.updateMany(
        {
          _id: { $ne: data.id },
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

    return this.listRepository.findByIdAndUpdate(data.id, data.body);
  }

  async updateList(id: string, list: UpdateListDto) {
    return this.listRepository.findByIdAndUpdate(id, list);
  }

  async createList(list: CreateListDto) {
    const response = await this.listRepository.findAll();
    list.position = response.length;
    return await this.listRepository.create(list);
  }

  async deleteList(id: string) {
    return this.listRepository.deleteOne(id);
  }
}
