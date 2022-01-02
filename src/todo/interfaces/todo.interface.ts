import { TodoStatus } from '../enums/todo-status.enum';
import { IAudit } from './audit.interface';

export interface ITodo extends IAudit {
  title: string;
  description?: string;
  assignedTo?: number;
  status: TodoStatus;
}
