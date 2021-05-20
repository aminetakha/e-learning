import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Answer } from "./Answer";
import { File } from "./File";
import { Student } from "./Student";

@Entity({ name: "questions" })
export class Question {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	question: string;

	@ManyToOne(() => File, (file) => file.questions)
	file: File;

	@OneToMany(() => Answer, (answer) => answer.question)
	answers: Answer[];

	@ManyToOne(() => Student, (student) => student.questions)
	student: Student;
}
