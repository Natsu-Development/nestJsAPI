import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Put,
} from '@nestjs/common';
import { query } from 'express';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAllTodo(@Query('search') search: string) {
    if (search != undefined && search.length > 0) {
      return await this.todoService.findByQuery(search);
    } else {
      return await this.todoService.findAll();
    }
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.todoService.findOne(id);
  }

  @Post('add')
  async create(@Body() createTodoDto: CreateTodoDto) {
    return await this.todoService.createTodo(createTodoDto);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return await this.todoService.update(id, updateTodoDto);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.todoService.delete(id);
  }
}
