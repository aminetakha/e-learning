import { Service } from "typedi";
import { getRepository } from "typeorm";
import { LoginDto } from "../dto/loginDto";
import { Instructor } from "../entity/Instructor";
import { Student } from "../entity/Student";
import createJwtToken from "../util/createJwtToken";
import verifyPassword from "../util/verifyPassword";

interface CurrentUser {
	id: number;
	username: string;
	photo: string;
}

interface Response {
	token: string;
	user: CurrentUser;
}

@Service()
export class LoginService {
	private studentRepository = getRepository(Student);
	private instructorRepository = getRepository(Instructor);

	async userLogin(loginDto: LoginDto, userType: string) {
		const { email, password } = loginDto;
		const user =
			userType === "student"
				? await this.studentRepository.findOne({
						where: { email },
						select: [
							"email",
							"password",
							"id",
							"username",
							"photo",
						],
						relations: ["cart", "cart.courses"],
				  })
				: await this.instructorRepository.findOne({ email });

		if (!user) {
			return { error: "not found" };
		}

		const result = await verifyPassword(password, user.password);
		if (!result) {
			return { error: "Wrong password" };
		}

		const token = await createJwtToken({ user: user.id });
		const currUser = {
			id: user.id,
			username: user.username,
			photo: user.photo,
		};
		return {
			token,
			user: currUser,
			cart: (user as any).cart.courses.length,
		};
	}
}
