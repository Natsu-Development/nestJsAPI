import { IsNotEmpty, MinLength } from 'class-validator';

export class BaseTodoDto {
  @IsNotEmpty()
  @MinLength(3)
  todoName: string;
}
