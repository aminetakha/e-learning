import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { File } from "./File";
import { Instructor } from "./Instructor";
import { Question } from "./Question";
import { Review } from "./Review";

@Entity({ name: "courses" })
export class Course {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	content: string;

	@Column()
	thumbnail: string;

	@OneToMany(() => File, (file) => file.course)
	files: File[];

	@ManyToOne(() => Instructor, (instrutor) => instrutor.courses)
	instructor: Instructor;

	@ManyToOne(() => Category, (category) => category.courses)
	category: Category;

	@OneToMany(() => Review, (review) => review.course)
	reviews: Review[];
}
