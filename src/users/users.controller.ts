import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @ApiOperation({summary: 'Create user'})
  @ApiResponse({status: 200, type: User})
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({summary: 'Get all users'})
  @ApiResponse({status: 200, type: [User]})
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({summary: 'Get one user'})
  @ApiResponse({status: 200, type: User})
  @ApiParam({name: 'id', type: 'number', description: 'Unique key for user'})
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }
}
