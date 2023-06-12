import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateListDto, UpdateListDto } from '../dto/list.dto';
import { ListRepository } from '../repositories/list.repository';

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  async getAllLists(query) {
    const { sort = {}, order = {}, ...restOfQuery } = query;
    const sortByPosition = { position: 1 };
    return await this.listRepository.getByCondition(
      restOfQuery || {},
      sortByPosition,
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
    console.log('lists: ', lists);
    return await this.listRepository.updateMany({}, lists);
  }

  async updateList(id: string, list: UpdateListDto) {
    return await this.listRepository.findByIdAndUpdate(id, list);
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
