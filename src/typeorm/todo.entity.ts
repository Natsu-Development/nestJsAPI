import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'todo_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  todoName: string;
}
