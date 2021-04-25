import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Answer } from "./Answer";
import { Course } from "./Course";

@Entity({ name: "instructors" })
export class Instructor {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	about: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	country: string;

	@OneToMany(() => Course, (course) => course.instructor)
	courses: Course[];

	@OneToMany(() => Answer, (answer) => answer.instructor)
	answers: Answer[];
}
