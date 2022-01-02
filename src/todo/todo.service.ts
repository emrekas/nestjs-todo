import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  public async findAll(pagination: PaginationDto): Promise<Todo[]> {
    const { nPerPage, pageNumber } = pagination;

    return await this.todoModel
      .find()
      .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
      .limit(nPerPage);
  }

  public async findOne(todoId: string): Promise<Todo> {
    const todo = this.todoModel.findById(todoId);

    if (!todo) throw new NotFoundException(`Todo #${todoId} not found`);

    return todo;
  }

  public async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return await (await this.todoModel.create(createTodoDto)).save();
  }

  public async update(
    todoId: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    const updatedTodo = await this.todoModel.findByIdAndUpdate(
      todoId,
      updateTodoDto,
    );

    if (!updatedTodo) throw new NotFoundException(`Todo #${todoId} not found`);

    return updatedTodo;
  }

  public async remove(todoId: string): Promise<Todo> {
    return this.todoModel.findByIdAndDelete(todoId);
  }
}
