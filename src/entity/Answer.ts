import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Instructor } from "./Instructor";
import { Question } from "./Question";
import { Student } from "./Student";

@Entity({ name: "answers" })
export class Answer {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	answer: string;

	@ManyToOne(() => Question, (question) => question.answers)
	question: Question;

	@ManyToOne(() => Student, (student) => student.answers, {
		onDelete: "CASCADE",
	})
	student: Student[];

	@ManyToOne(() => Instructor, (instructor) => instructor.answers)
	instructor: Instructor[];
}
