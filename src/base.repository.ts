/* eslint-disable prettier/prettier */
import { Model, Document, FilterQuery, QueryOptions } from 'mongoose';

export class BaseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async findById(
    id: string,
    projection?,
    options?: QueryOptions,
  ): Promise<T | null> {
    return this.model.findById(id, projection, options);
  }

  // async findByCondition(
  //   filter,
  //   field?: any | null,
  //   option?: any | null,
  //   populate?: any | null,
  // ): Promise<T> {
  //   return this.model.findOne(filter, field, option).populate(populate);
  // }

  async getByCondition(filter, sort?: any | null): Promise<T[]> {
    return this.model.find(filter).sort(sort);
  }

  async create(doc): Promise<any> {
    const createEntity = new this.model(doc);
    return await createEntity.save();
  }

  async aggregate(option: any) {
    return this.model.aggregate(option);
  }

  async populate(result: T[], options: any) {
    return await this.model.populate(result, options);
  }

  async deleteOne(id: string) {
    return this.model.deleteOne({ _id: id } as FilterQuery<T>);
  }

  async deleteMany(id: string[]) {
    return this.model.deleteMany({ _id: { $in: id } } as FilterQuery<T>);
  }

  async deleteByCondition(filter) {
    return this.model.deleteMany(filter);
  }

  async findByConditionAndUpdate(filter, update) {
    return this.model.findOneAndUpdate(filter as FilterQuery<T>, update);
  }

  async updateMany(filter, update, options?: any | null) {
    return this.model.updateMany(filter, update, options);
  }

  // Patch
  async findByIdAndUpdate(id: string, update) {
    return this.model.findByIdAndUpdate(id, update);
  }

  // Put
  async findOneAndReplace(id: string, update) {
    return this.model.findOneAndReplace({ id }, update);
  }
}
