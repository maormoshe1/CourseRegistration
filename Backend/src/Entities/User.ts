import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { CourseDate } from "./CourseDate";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  birthday!: Date;

  @Column()
  email!: string;

  @Column()
  phoneNumber!: string;

  @ManyToMany(() => CourseDate, (courseDate) => courseDate.users)
  @JoinTable()
  courseDates!: CourseDate[];
}
