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
	photo: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	website: string;

	@Column()
	github: string;

	@Column()
	twitter: string;

	@Column()
	youtube: string;

	@Column()
	country: string;

	@OneToMany(() => Course, (course) => course.instructor)
	courses: Course[];

	@OneToMany(() => Answer, (answer) => answer.instructor)
	answers: Answer[];
}
