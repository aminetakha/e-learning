import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

	@ManyToOne(() => Student, (student) => student.questions)
	student: Student[];
}
