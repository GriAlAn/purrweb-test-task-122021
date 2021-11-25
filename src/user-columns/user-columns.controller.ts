import { Controller, Delete, Get, Param, Req } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Column } from '../columns/column.model';
import { ColumnsService } from '../columns/columns.service';
import { UsersService } from '../users/users.service';

@ApiTags('User columns')
@Controller('users')
export class UserColumnsController {
  constructor(private columnsService: ColumnsService, private userService: UsersService) {
  }

  @ApiOperation({summary: 'Get all columns by user'})
  @ApiResponse({status: 200, type: [Column], })
  @Get(':userId/columns')
  async getColumnsByUser(@Req() request: Request, @Param('userId') userId: number) {
    const user = await this.userService.getUserById(userId);
    return this.columnsService.getColumnsByUser(user);
  }

  @ApiOperation({summary: 'Delete column by user'})
  @ApiResponse({status: 200})
  @ApiParam({name: 'id', type: 'number', description: 'Unique key for user'})
  @Delete(':userId/columns/:columnId')
  async deleteColumnById(@Req() request: Request, @Param('userId') userId: number, @Param('columnId') columnId: number) {
    const user = await this.userService.getUserById(userId);
    return this.columnsService.deleteColumnByUser(columnId, user);
  }
}
