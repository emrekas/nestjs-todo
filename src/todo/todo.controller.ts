import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  /**
   *
   */
  constructor(private todoService: TodoService) {}

  @Get()
  public async getAllTodo(@Res() res, @Query() pagination: PaginationDto) {
    const todos = await this.todoService.findAll(pagination);

    return res.status(HttpStatus.OK).json(todos);
  }

  @Get('/:id')
  public async getTodo(@Res() res, @Param('id') todoId: string) {
    const todo = await this.todoService.findOne(todoId);

    return res.status(HttpStatus.OK).json(todo);
  }

  @Post()
  public async addTodo(@Res() res, @Body() createTodoDto: CreateTodoDto) {
    try {
      console.log(createTodoDto);

      const todo = await this.todoService.create(createTodoDto);

      return res.status(HttpStatus.CREATED).send(todo);
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Todo not created!',
        status: 400,
      });
    }
  }

  @Put('/:id')
  public async updateTodo(
    @Res() res,
    @Param('id') todoId: string,
    @Body() updateTodo: UpdateTodoDto,
  ): Promise<any> {
    if (!todoId) throw new NotFoundException('TodoId does not exist!');
    const todo = await this.todoService.update(todoId, updateTodo);

    return res.status(HttpStatus.OK).json({
      message: 'Todo has been successfully updated',
      todo,
    });
  }
}
