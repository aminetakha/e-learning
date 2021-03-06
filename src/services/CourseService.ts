import Container, { Service } from "typedi";
import { getManager, getRepository, LessThanOrEqual, Like } from "typeorm";
import { Answer } from "../entity/Answer";
import { Category } from "../entity/Category";
import { Course } from "../entity/Course";
import { File } from "../entity/File";
import { Instructor } from "../entity/Instructor";
import { Question } from "../entity/Question";
import { Section } from "../entity/Section";
import { InstructorService } from "./InstructorService";
import { StudentService } from "./StudentService";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2020-08-27",
});

@Service()
export class CourseService {
	private categoryRepository = getRepository(Category);
	private courseRepository = getRepository(Course);
	private instructorRepository = getRepository(Instructor);
	private answerRepository = getRepository(Answer);
	private sectionRepository = getRepository(Section);
	private questionRepository = getRepository(Question);
	private fileRepository = getRepository(File);

	async getCoursesByCategory(category: string) {
		const courses = await this.categoryRepository.find({
			where: { title: category },
			relations: ["courses"],
		});
		return courses;
	}

	async createCourse(course) {
		const instructor = await this.instructorRepository.findOne(
			course.instructor
		);
		const category = await this.categoryRepository.findOne({
			where: { title: course.category },
		});
		const newCourse = new Course();
		newCourse.title = course.title;
		newCourse.description = course.description;
		newCourse.content = course.content;
		newCourse.target = course.target;
		newCourse.category = category;
		newCourse.requirements = course.requirements;
		newCourse.thumbnail = course.thumbnail;
		newCourse.price = parseInt(course.price);
		newCourse.instructor = instructor;
		newCourse.category = category;
		const createdCourse = await this.courseRepository.save(newCourse);
		return createdCourse.id;
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
		const courses = await this.courseRepository.findOne({
			where: { title: title },
			relations: [
				"reviews",
				"reviews.student",
				"sections",
				"sections.files",
				"instructor",
			],
		});
		return {
			...courses,
		};
	}

	async getCourseFilesByTitle(title: string) {
		const courses = await this.courseRepository.findOne({
			where: { title: title },
			relations: [
				"sections",
				"sections.files",
				"sections.files.questions",
				"sections.files.questions.student",
				"instructor",
			],
		});
		return {
			...courses,
		};
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
			"select avg(rating) as average_rating, courses.*, instructors.username from reviews, courses, instructors where reviews.courseId = courses.id and courses.instructorId = instructors.id group by courseId order by average_rating desc"
		);
		return courses;
	}

	/*
	async getLatest() {
		const courses = await this.courseRepository.find({
			order: { createdAt: "DESC" },
			take: 5,
		});
		return courses;
	}*/

	async getLatest() {
		const courses = await getManager().query(
			"select avg(rating) as average_rating, courses.*, instructors.username from reviews, courses, instructors where reviews.courseId = courses.id and courses.instructorId = instructors.id group by courseId order by created_at desc"
		);
		return courses;
	}

	async getCourseById(id: number) {
		const course = await this.courseRepository.findOne(id);
		return course;
	}

	async addSectionForCourse(courseId: number, title: string) {
		let section = new Section();
		const course = await this.getCourseById(courseId);
		section.title = title;
		section.course = course;
		section = await this.sectionRepository.save(section);
		return section;
	}

	async updateSectionName(sectionId: number, title: string) {
		const section = await this.sectionRepository.findOne(sectionId);
		section.title = title;
		await this.sectionRepository.save(section);
	}

	async getCourseAnswers(questionId: number) {
		const course = await this.questionRepository.findOne(questionId, {
			relations: ["answers", "answers.student", "answers.instructor"],
		});
		return course;
	}

	async addQuestion(fileId: number, studentId: number, question: string) {
		const file = await this.fileRepository.findOne(fileId);
		const studentService = Container.get(StudentService);
		const student = await studentService.getStudentById(studentId);
		const q = new Question();
		q.question = question;
		q.file = file;
		q.student = student;
		const addedQuestion = await this.questionRepository.save(q);
		return addedQuestion;
	}

	async addAnswer(
		userId: number,
		type: string,
		answer: string,
		questionId: number
	) {
		let service =
			type === "student"
				? Container.get(StudentService)
				: Container.get(InstructorService);
		let user;
		if (service instanceof StudentService) {
			user = await service.getStudentById(userId);
		} else if (service instanceof InstructorService) {
			user = await service.findById(userId);
		}

		const question = await this.questionRepository.findOne(questionId);
		const a = new Answer();
		a.answer = answer;
		a.question = question;
		a.instructor = type === "instructor" ? user : null;
		a.student = type === "student" ? user : null;
		const addedAnswer = await this.answerRepository.save(a);
		return addedAnswer;
	}

	async getCourseStats(courseId: number) {
		const course = await getManager().query(
			`select c.price, count(*) as count, c.price * count(*) as total from students_courses_courses s, courses c where s.coursesId=${courseId} and c.id=${courseId}`
		);
		const reviews = await getManager().query(
			`select r.review, r.rating, s.photo from reviews r, students s where r.courseId=${courseId} and r.studentId = s.id`
		);
		let sum = 0;

		reviews.forEach((review) => {
			sum += review.rating;
		});
		const data = { course, reviews, avg: sum / reviews.length };
		return data;
	}

	async getAllCourses() {
		const newCourses = await this.courseRepository
			.createQueryBuilder("courses")
			.leftJoinAndSelect("courses.category", "category")
			.leftJoinAndSelect("courses.reviews", "reviews")
			.getMany();

		const averageRating = (reviews) => {
			if (reviews.length === 0) {
				return 0;
			}
			let total = 0;
			reviews.forEach((review) => {
				total += review.rating;
			});
			return total / reviews.length;
		};

		const courses = newCourses.map((course) => {
			const courseRating = averageRating(course.reviews);
			return {
				id: course.id,
				courseTitle: course.title,
				title: course.category.title,
				thumbnail: course.thumbnail,
				price: course.price,
				average_per_course: courseRating,
			};
		});
		return courses;
	}

	async getTotalEarning() {
		const count = await getManager().query(
			"select c.id, c.price, count(*) as count from students_courses_courses s, courses c where s.coursesId = c.id  group by coursesId"
		);
		let total = 0;
		count.forEach((el) => {
			total = total + parseInt(el.count) * el.price;
		});
		return total;
	}

	async searchCourses(title: string) {
		const courses = await this.courseRepository.find({
			title: Like(`%${title}%`),
		});
		return courses;
	}

	async enroll(courseId: number, studentId: number, id) {
		const studentService = Container.get(StudentService);
		const courseService = Container.get(CourseService);
		const course = await courseService.getCourseById(courseId);

		const count = await studentService.verifyCourseEnrollment(
			studentId,
			courseId
		);

		if (count === 1) {
			throw new Error("You have already bought the course");
		}

		const payment = await stripe.paymentIntents.create({
			amount: Math.ceil(course.price * 100),
			currency: "USD",
			description: course.title,
			payment_method: id,
			confirm: true,
		});

		await getManager().query(
			`INSERT INTO students_courses_courses (studentsId, coursesId) values (${studentId}, ${courseId})`
		);
		await studentService.removeItemFromCart(courseId, studentId);
	}
}
