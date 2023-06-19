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
import { CardService } from '../services/card.service';
import {
  CreateCardDto,
  UpdateAllCardDto,
  UpdateCardDto,
  UpdateManyCardDto,
} from '../dto/card.dto';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  getAllCards(@Query() query) {
    return this.cardService.getAllCards(query);
  }

  @Get(':list_id')
  getAllCardsByListId(@Param('list_id') list_id: string) {
    return this.cardService.getAllCardsByListId(list_id);
  }

  @Get(':id')
  getCardById(@Param('id') id: string) {
    return this.cardService.getCardById(id);
  }

  @Post()
  async createCard(@Body() card: CreateCardDto) {
    return this.cardService.createCard(card);
  }

  @Put(':list_id/:id')
  async updateAllCard(
    @Param('list_id') list_id: string,
    @Param('id') id: string,
    @Body() Card: UpdateAllCardDto,
    @Query() query,
  ) {
    return this.cardService.updateCard(list_id, id, Card, query);
  }

  @Patch(':list_id/:id')
  async updateCard(
    @Param('list_id') list_id: string,
    @Param('id') id: string,
    @Body() Card: UpdateCardDto,
    @Query() query,
  ) {
    return this.cardService.updateCard(list_id, id, Card, query);
  }

  @Patch()
  async updateManyCard(@Body() data: UpdateManyCardDto) {
    return this.cardService.updateManyCard(data);
  }

  @Delete(':id')
  async deleteCard(@Param('id') id: string) {
    return this.cardService.deleteCard(id);
  }
}
