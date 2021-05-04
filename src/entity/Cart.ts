import {
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course";
import { Student } from "./Student";

@Entity({ name: "carts" })
export class Cart {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => Student, (student) => student.cart)
	@JoinColumn()
	student: Student;

	@ManyToMany(() => Course)
	@JoinTable()
	courses: Course[];
}
