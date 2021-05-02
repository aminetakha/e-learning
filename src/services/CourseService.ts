import { Service } from "typedi";
import { getManager, getRepository, LessThanOrEqual, Like } from "typeorm";
import { Category } from "../entity/Category";
import { Course } from "../entity/Course";
import { Instructor } from "../entity/Instructor";
import { Review } from "../entity/Review";

@Service()
export class CourseService {
	private categoryRepository = getRepository(Category);
	private courseRepository = getRepository(Course);
	private instructorRepository = getRepository(Instructor);
	private reviewRepository = getRepository(Review);

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
			where: { title: Like(`%${title}%`) },
			relations: ["reviews"],
		});
		return courses;
	}

	async getCourseByPrice(price: number) {
		const courses = await this.courseRepository.find({
			where: { price: LessThanOrEqual(price) },
			relations: ["reviews"],
		});
		return courses;
	}

	async getMostPopular() {
		const courses = await getManager().query(
			"select avg(rating) as average_rating, courses.* from reviews, courses where reviews.courseId = courses.id group by courseId order by average_rating desc"
		);
		return courses;
	}

	async getLatest() {
		const courses = await this.courseRepository.find({
			order: { createdAt: "DESC" },
			take: 5,
		});
		return courses;
	}
}
