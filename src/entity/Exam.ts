import {
	Column,
	Entity,
	JoinTable,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course";
import { Student } from "./Student";

@Entity()
export class Exam {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	score: number;

	@ManyToOne(() => Student, (student) => student.exams)
	student: Student;

	@OneToOne(() => Course)
	@JoinTable()
	course: Course;
}
