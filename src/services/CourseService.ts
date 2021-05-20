import Container, { Service } from "typedi";
import { getManager, getRepository, LessThanOrEqual, Like } from "typeorm";
import { Answer } from "../entity/Answer";
import { Category } from "../entity/Category";
import { Course } from "../entity/Course";
import { File } from "../entity/File";
import { Instructor } from "../entity/Instructor";
import { Question } from "../entity/Question";
import { Review } from "../entity/Review";
import { Section } from "../entity/Section";
import { Student } from "../entity/Student";
import { InstructorService } from "./InstructorService";
import { StudentService } from "./StudentService";

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
		newCourse.title = course.category;
		newCourse.description = course.description;
		newCourse.content = course.content;
		newCourse.target = course.target;
		newCourse.category = course.category;
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
			where: { title: Like(`%${title}%`) },
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
			where: { title: Like(`%${title}%`) },
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
}
