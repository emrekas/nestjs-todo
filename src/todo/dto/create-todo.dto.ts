import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { TodoStatus } from '../enums/todo-status.enum';

export class CreateTodoDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  title: string;

  @MaxLength(256)
  description?: string;

  @IsNumber()
  assignedTo?: number;

  @IsNotEmpty()
  @IsEnum(TodoStatus)
  status: TodoStatus;
}
