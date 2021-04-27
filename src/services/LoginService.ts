import { Service } from "typedi";
import { getRepository } from "typeorm";
import { LoginDto } from "../dto/loginDto";
import { Instructor } from "../entity/Instructor";
import { Student } from "../entity/Student";
import createJwtToken from "../util/createJwtToken";
import verifyPassword from "../util/verifyPassword";

@Service()
export class LoginService {
	private studentRepository = getRepository(Student);
	private instructorRepository = getRepository(Instructor);

	async userLogin(
		loginDto: LoginDto,
		userType: string
	): Promise<string | { error: string }> {
		const { email, password } = loginDto;
		const user =
			userType === "student"
				? await this.studentRepository.findOne({ email })
				: await this.instructorRepository.findOne({ email });

		console.log(loginDto, userType);

		if (!user) {
			return { error: "not found" };
		}

		const result = await verifyPassword(password, user.password);
		if (!result) {
			return { error: "Wrong password" };
		}

		const token = await createJwtToken({ user: user.id });
		return token;
	}
}
