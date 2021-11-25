import { Body, Controller, Delete, Get, Param, Put, Req, Post } from '@nestjs/common';
import { Request } from 'express';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';

@Controller('columns')
export class ColumnsController {
  constructor(private columnsService: ColumnsService) {
  }

  @Post()
  async createColumn(@Req() request: Request, @Body() createColumnDto: CreateColumnDto) {
    const token = request.headers.authorization.split(' ')[1]
    return this.columnsService.createColumn(createColumnDto, token);
  }

  @Get(':id')
  async getOneColumnById(@Param('id') id: number) {
    return this.columnsService.getOneColumn(id);
  }

  @Get()
  async getAllColumns() {
    return this.columnsService.getAllColumns();
  }

  @Put(':id')
  updateColumnById(@Param('id') id: number) {
    return this.columnsService.updateColumn(id);
  }

  @Delete(':id')
  async deleteColumnById(@Param('id') id: number) {
    return this.columnsService.deleteColumn(id)
  }

}
