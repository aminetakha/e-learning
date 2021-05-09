import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Answer } from "./Answer";
import { Cart } from "./Cart";
import { Course } from "./Course";
import { Exam } from "./Exam";
import { Question } from "./Question";
import { Review } from "./Review";

@Entity({ name: "students" })
export class Student {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	photo: string;

	@Column()
	email: string;

	@Column({ select: false })
	password: string;

	@Column()
	country: string;

	@ManyToMany(() => Course)
	@JoinTable()
	courses: Course[];

	@OneToOne(() => Cart, (cart) => cart.student)
	cart: Cart;

	@OneToMany(() => Review, (review) => review.student)
	reviews: Review[];

	@OneToMany(() => Question, (question) => question.student)
	questions: Question[];

	@OneToMany(() => Answer, (answer) => answer.student)
	answers: Answer[];

	@OneToMany(() => Exam, (exam) => exam.student)
	exams: Exam[];
}
