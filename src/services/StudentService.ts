import { Service } from "typedi";
import { getRepository } from "typeorm";
import { Cart } from "../entity/Cart";
import { Student } from "../entity/Student";

@Service()
export class StudentService {
	private studentRepository = getRepository(Student);
	private cartRepository = getRepository(Cart);

	async getStudentById(id: number) {
		const student = await this.studentRepository.findOne(id);
		return student;
	}

	async getStudentCart(id: number) {
		const cart = await this.studentRepository.findOne(id, {
			relations: ["cart", "cart.courses"],
		});
		return cart;
	}

	async removeItemFromCart(courseId: number, userId: number) {
		const user = await this.studentRepository.findOne(userId, {
			relations: ["cart"],
		});
		const cartId = user.cart.id;
		await this.cartRepository.query(
			`DELETE FROM carts_courses_courses WHERE cartsId=${cartId} AND coursesId=${courseId}`
		);
	}

	async findItemInCart(courseId: number, userId: number) {
		const user = await this.studentRepository.findOne(userId, {
			relations: ["cart"],
		});
		const cartId = user.cart.id;
		const course = await this.cartRepository.query(
			`SELECT * FROM carts_courses_courses WHERE cartsId=${cartId} AND coursesId=${courseId}`
		);

		return course;
	}

	async addToCart(courseId: number, userId: number) {
		const user = await this.studentRepository.findOne(userId, {
			relations: ["cart"],
		});
		const cartId = user.cart.id;
		await this.cartRepository.query(
			`insert into carts_courses_courses(cartsId, coursesId) values (${cartId}, ${courseId})`
		);
	}

	async getCurrentUserCourses(userId: number) {
		const courses = await this.studentRepository.findOne(userId, {
			relations: ["courses"],
		});
		return courses;
	}

	async verifyCourseEnrollment(studentId: number, courseId: number) {
		const courseCount = await this.studentRepository
			.createQueryBuilder("student")
			.leftJoin("student.courses", "course")
			.where("(student.id = :studentId AND course.id = :courseId)")
			.setParameters({ studentId, courseId })
			.getCount();
		return courseCount;
	}
}
