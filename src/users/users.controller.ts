// users.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} 

  @Post()
  async create(@Body() createUserDto: User) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: User) {
    return this.usersService.login(loginUserDto);
  }  

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: User) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return { name: user.name }; 
  }

}

