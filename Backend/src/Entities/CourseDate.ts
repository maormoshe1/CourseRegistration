import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  Unique,
} from "typeorm";
import { Course } from "./Course";
import { User } from "./User";

@Entity()
@Unique(['date', 'course'])
export class CourseDate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @ManyToOne(() => Course, (course) => course.courseDates)
  course!: Course;

  @ManyToMany(() => User, (user) => user.courseDates)
  users!: User[];
}
