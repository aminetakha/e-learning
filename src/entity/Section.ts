import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course";
import { File } from "./File";

@Entity({ name: "sections" })
export class Section {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@ManyToOne(() => Course, (course) => course.sections)
	course: Course;

	@OneToMany(() => File, (file) => file.section)
	files: File[];
}
