import { define, factory } from "typeorm-seeding";
import { Category } from "../entity/Category";
import { Course } from "../entity/Course";
import { Instructor } from "../entity/Instructor";

define(Course, (faker) => {
	const course = new Course();
	course.title = faker.random.word();
	course.description = faker.lorem.lines(3);
	course.content = faker.lorem.lines(1);
	course.thumbnail = faker.image.avatar();
	course.price = 200;
	course.instructor = factory(Instructor)() as any;
	course.category = factory(Category)() as any;
	return course;
});
