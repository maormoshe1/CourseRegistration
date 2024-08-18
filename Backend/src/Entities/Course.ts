import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  Unique,
} from "typeorm";
import { CourseDate } from "./CourseDate";

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({unique: true})
  name!: string;

  @Column()
  info!: string;

  @OneToMany(() => CourseDate, (courseDate) => courseDate.course)
  courseDates!: CourseDate[];
}
