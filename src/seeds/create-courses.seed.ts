import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Course } from "../entity/Course";

export default class CreateCourses implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		await factory(Course)().createMany(11);
	}
}
