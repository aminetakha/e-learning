import { Service } from "typedi";
import { getRepository, LessThanOrEqual, Like } from "typeorm";
import { Category } from "../entity/Category";
import { Course } from "../entity/Course";
import { Instructor } from "../entity/Instructor";

@Service()
export class CourseService {
	private categoryRepository = getRepository(Category);
	private courseRepository = getRepository(Course);
	private instructorRepository = getRepository(Instructor);

	async getCoursesByCategory(category: string) {
		const courses = await this.categoryRepository.find({
			where: { title: category },
			relations: ["courses"],
		});
		return courses;
	}

	async getCoursesByInstructor(instructor: string) {
		const courses = await this.instructorRepository.find({
			where: { username: instructor },
			select: ["id", "username", "photo"],
			relations: ["courses"],
		});
		return courses;
	}

	async getCourseByTitle(title: string) {
		const courses = await this.courseRepository.find({
			title: Like(`%${title}%`),
		});
		return courses;
	}

	async getCourseByPrice(price: number) {
		const courses = await this.courseRepository.find({
			price: LessThanOrEqual(price),
		});
		return courses;
	}
}
