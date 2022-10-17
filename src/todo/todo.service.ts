import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  // implement it to use all of method of mongoose
  constructor(
    @InjectModel(Todo.name) private readonly model: Model<TodoDocument>
  ) {}

  async findAll(): Promise<Todo[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Todo> {
    return await this.model.findById(id).exec();
  }

  async findByQuery(todoName: string): Promise<Todo[]> {
    return await this.model
      .find({ name: { $regex: todoName, $options: 'i' } })
      .exec();
  }

  async createTodo(createTodo: CreateTodoDto): Promise<Todo> {
    return await new this.model({
      ...createTodo,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateTodo: UpdateTodoDto): Promise<Todo> {
    return await this.model
      .findByIdAndUpdate(id, updateTodo, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Todo> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
