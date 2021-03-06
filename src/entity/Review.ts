import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course";
import { Student } from "./Student";

@Entity({ name: "reviews" })
export class Review {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	review: string;

	@Column()
	rating: number;

	@ManyToOne(() => Student, (student) => student.courses, {
		onDelete: "CASCADE",
	})
	student: Student;

	@ManyToOne(() => Course, (course) => course.reviews, {
		onDelete: "CASCADE",
	})
	course: Course;
}
