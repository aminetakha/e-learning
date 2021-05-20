import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { File } from "./File";
import { Instructor } from "./Instructor";
import { Question } from "./Question";
import { Student } from "./Student";

@Entity({ name: "answers" })
export class Answer {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	answer: string;

	@ManyToOne(() => File, (file) => file.answers)
	file: File;

	@ManyToOne(() => Question, (question) => question.answers)
	question: Question;

	@ManyToOne(() => Question, (question) => question.answers)
	question: Question;

	@ManyToOne(() => Question, (question) => question.answers)
	question: Question;

	@ManyToOne(() => Student, (student) => student.answers)
	student: Student[];

	@ManyToOne(() => Instructor, (instructor) => instructor.answers)
	instructor: Instructor[];
}
