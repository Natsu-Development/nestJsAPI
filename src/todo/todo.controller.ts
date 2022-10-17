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
import { BaseTodoDto } from './dto/base-todo.dto';
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
  async find(@Param('id') id: number) {
    return await this.todoService.findOne(id);
  }

  @Post()
  async create(@Body() createTodoDto: BaseTodoDto) {
    return await this.todoService.createTodo(createTodoDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateTodoDto: BaseTodoDto) {
    return await this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.todoService.delete(id);
  }
}
