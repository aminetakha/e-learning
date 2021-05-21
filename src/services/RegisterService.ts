import { Service } from "typedi";
import { getRepository } from "typeorm";
import { RegisterDto } from "../dto/registerDto";
import { RegisterStudentDto } from "../dto/registerStudentDto";
import { Cart } from "../entity/Cart";
import { Instructor } from "../entity/Instructor";
import { Student } from "../entity/Student";
import hashPassword from "../util/hashPassword";

@Service()
export class RegisterService {
	private instructorRepository = getRepository(Instructor);
	private studentRepository = getRepository(Student);
	private cartRepository = getRepository(Cart);

	async registerUser(regiserDto: RegisterDto) {
		let instructor = await this.instructorRepository.findOne({
			email: regiserDto.email,
		});
		if (instructor) {
			return { error: "Email already exists" };
		}
		regiserDto.password = await hashPassword(regiserDto.password);
		instructor = await this.instructorRepository.save(regiserDto);
		return { instructor };
	}

	async registerStudent(registerStudentDto: RegisterStudentDto) {
		let student = await this.studentRepository.findOne({
			email: registerStudentDto.email,
		});
		if (student) {
			return { error: "Email already exists" };
		}
		registerStudentDto.password = await hashPassword(
			registerStudentDto.password
		);
		student = await this.studentRepository.save(registerStudentDto);
		const cart = new Cart();
		cart.student = student;
		await this.cartRepository.save(cart);
		return { student };
	}
}
