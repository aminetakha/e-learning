import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Answer } from "./Answer";
import { Course } from "./Course";
import { Question } from "./Question";
import { Section } from "./Section";

@Entity({ name: "files" })
export class File {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@ManyToOne(() => Course, (course) => course.files)
	course: Course;

	@OneToMany(() => Question, (question) => question.file)
	questions: Question[];

	// @OneToMany(() => Answer, (answer) => answer.file)
	// answers: Answer[];

	@ManyToOne(() => Section, (section) => section.files)
	section: Section;
}
