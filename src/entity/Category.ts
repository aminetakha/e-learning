import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course";

@Entity({ name: "categories" })
export class Category {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	thumbnail: string;

	@OneToMany(() => Course, (course) => course.category)
	courses: Course[];
}
