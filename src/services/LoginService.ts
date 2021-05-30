import { Service } from "typedi";
import { getManager, getRepository } from "typeorm";
import { LoginDto } from "../dto/loginDto";
import { Cart } from "../entity/Cart";
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
	private cartRepository = getRepository(Cart);

	async getStudentCart(student: Student, cartItems) {
		const cart = await this.cartRepository.findOne({
			where: { student },
		});
		this.addCoursesToCartAfterLogin(cartItems, cart.id);
	}

	async addCoursesToCartAfterLogin(cartItems, cartId: number) {
		cartItems.forEach(async (course) => {
			await getManager().query(
				`INSERT INTO carts_courses_courses (cartsId, coursesId) VALUES (${cartId}, ${course.id})`
			);
		});
	}

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
				: await this.instructorRepository.findOne({
						where: { email },
						select: [
							"email",
							"password",
							"id",
							"username",
							"photo",
							"website",
							"github",
							"twitter",
							"youtube",
							"country",
							"about",
						],
				  });

		if (!user) {
			return { error: "not found" };
		}

		const result = await verifyPassword(password, user.password);
		if (!result) {
			return { error: "Wrong password" };
		}

		if (result && userType === "student" && loginDto.cart.length > 0) {
			await this.getStudentCart(user as Student, loginDto.cart);
		}

		const token = await createJwtToken({ user: user.id });
		const currUser = {
			id: user.id,
			username: user.username,
			photo: user.photo,
		};
		if (user instanceof Student) {
			return {
				token,
				user: currUser,
				cart: (user as any).cart.courses.length,
			};
		} else {
			return {
				token,
				user: {
					id: currUser.id,
					username: currUser.username,
					photo: currUser.photo,
					website: user.website,
					github: user.github,
					twitter: user.twitter,
					youtube: user.youtube,
					about: user.about,
					country: user.country,
				},
			};
		}
	}
}
