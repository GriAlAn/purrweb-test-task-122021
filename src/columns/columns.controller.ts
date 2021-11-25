import { Body, Controller, Delete, Get, Param, Put, Req, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Column } from './column.model';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@ApiTags('Columns')
@Controller('columns')
export class ColumnsController {
  constructor(private columnsService: ColumnsService) {
  }

  @ApiOperation({summary: 'Create column'})
  @ApiResponse({status: 200, type: Column})
  @Post()
  async createColumn(@Req() request: Request, @Body() createColumnDto: CreateColumnDto) {
    const token = request.headers.authorization.split(' ')[1]
    return this.columnsService.createColumn(createColumnDto, token);
  }

  @ApiOperation({summary: 'Get one column'})
  @ApiResponse({status: 200, type: Column})
  @ApiParam({name: 'id', type: 'number', description: 'Unique key for column'})
  @Get(':id')
  async getOneColumnById(@Param('id') id: number) {
    return this.columnsService.getOneColumn(id);
  }

  @ApiOperation({summary: 'Get all columns'})
  @ApiResponse({status: 200, type: [Column], })
  @Get()
  async getAllColumns() {
    return this.columnsService.getAllColumns();
  }

  @ApiOperation({summary: 'Update column'})
  @ApiResponse({status: 200, type: Column})
  @ApiParam({name: 'id', type: 'number', description: 'Unique key for column'})
  @Put(':id')
  updateColumnById(@Param('id') id: number, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnsService.updateColumn(id, updateColumnDto);
  }

  @ApiOperation({summary: 'Delete column'})
  @ApiResponse({status: 200})
  @ApiParam({name: 'id', type: 'number', description: 'Unique key for column'})
  @Delete(':id')
  async deleteColumnById(@Param('id') id: number) {
    return this.columnsService.deleteColumn(id)
  }

}
