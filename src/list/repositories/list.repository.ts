/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { List } from '../models/list.model';

@Injectable()
export class ListRepository extends BaseRepository<List> {
  constructor(
    @InjectModel('List')
    private readonly listModel: Model<List>,
  ) {
    super(listModel);
  }
}
