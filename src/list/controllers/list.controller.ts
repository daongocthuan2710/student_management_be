import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateListDto,
  UpdateListDto,
  UpdateManyListDto,
} from '../dto/list.dto';
import { ListService } from '../services/list.service';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  getAllLists(@Query() query) {
    return this.listService.getAllLists(query);
  }

  @Get(':id')
  getListById(@Param('id') id: string) {
    return this.listService.getListById(id);
  }

  @Post()
  async createList(@Body() list: CreateListDto) {
    return this.listService.createList(list);
  }

  @Put()
  async updateAllManyList(@Body() lists: UpdateListDto[]) {
    return this.listService.updateAllManyList(lists);
  }

  @Patch()
  async updateManyList(@Body() lists: UpdateManyListDto) {
    return this.listService.updateManyList(lists);
  }

  @Put(':id')
  async updateAllList(@Param('id') id: string, @Body() list: UpdateListDto) {
    return this.listService.updateAllList(id, list);
  }

  @Patch(':id')
  async updateList(@Param('id') id: string, @Body() list: UpdateListDto) {
    return this.listService.updateList(id, list);
  }

  @Delete(':id')
  async deleteList(@Param('id') id: string) {
    return this.listService.deleteList(id);
  }
}
