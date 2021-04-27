import { Service } from "typedi";
import { getRepository } from "typeorm";
import { LoginDto } from "../dto/loginDto";
import { Instructor } from "../entity/Instructor";
import { Student } from "../entity/Student";
import createJwtToken from "../util/createJwtToken";

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
				? await this.studentRepository.findOne({
						email,
						password,
				  })
				: await this.instructorRepository.findOne({ email, password });
		if (!user) {
			return { error: "not found" };
		}

		const token = await createJwtToken({ user: user.id });
		return token;
	}
}
