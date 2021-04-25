import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from "./File";

@Entity({ name: "sections" })
export class Section {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: number;

	@OneToMany(() => File, (file) => file.section)
	files: File[];
}
