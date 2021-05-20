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
import { Review } from "./Review";
import { Section } from "./Section";

@Entity({ name: "courses" })
export class Course {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	requirements: string;

	@Column()
	content: string;

	@Column()
	price: number;

	@Column()
	thumbnail: string;

	@Column()
	target: string;

	@Column({
		name: "created_at",
		type: "datetime",
		precision: 6,
		default: () => "CURRENT_TIMESTAMP(6)",
	})
	createdAt: string;

	@OneToMany(() => File, (file) => file.course)
	files: File[];

	@ManyToOne(() => Instructor, (instrutor) => instrutor.courses, {
		onDelete: "CASCADE",
	})
	instructor: Instructor;

	@ManyToOne(() => Category, (category) => category.courses)
	category: Category;

	@OneToMany(() => Review, (review) => review.course)
	reviews: Review[];

	@OneToMany(() => Section, (section) => section.course)
	sections: Section[];
}
