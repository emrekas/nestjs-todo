import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TodoStatus } from '../enums/todo-status.enum';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop()
  assignedTo?: number;

  @Prop({
    required: true,
    default: TodoStatus.Open,
  })
  status: TodoStatus;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
