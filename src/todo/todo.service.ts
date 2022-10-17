import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/typeorm';
import { Repository, Like } from 'typeorm';
import { BaseTodoDto } from './dto/base-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>
  ) {}

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  createTodo(createTodo: BaseTodoDto): Promise<Todo> {
    const newTodo = this.todoRepository.create(createTodo);
    return this.todoRepository.save(newTodo);
  }

  async findByQuery(todoName: string): Promise<Todo[]> {
    return await this.todoRepository.findBy({
      todoName: Like(`%${todoName}%`),
    });
  }

  async findOne(id: number) {
    return await this.todoRepository.findOneBy({ id: id });
  }

  async update(id: number, updateTodo: BaseTodoDto) {
    return await this.todoRepository.update({ id }, updateTodo);
  }

  async delete(id: number) {
    return await this.todoRepository.delete(id);
  }
}
