import { Request, Response, Router } from "express";
import loginCredentialsAndService from "../util/loginCredentialsAndService";
const router = Router();

router.post("/student", async (req: Request, res: Response) => {
	const { credentials, loginService } = loginCredentialsAndService(req.body);
	const response = await loginService.userLogin(credentials, "student");
	if (typeof response !== "string" && "error" in response) {
		return res.status(404).json({ message: response.error });
	}
	res.cookie("jwt", response.token, { httpOnly: true });
	res.status(200).json({
		user: response.user,
		type: "student",
		cart: response.cart,
	});
});
router.post("/instructor", async (req: Request, res: Response) => {
	const { credentials, loginService } = loginCredentialsAndService(req.body);
	const response = await loginService.userLogin(credentials, "instructor");
	if (typeof response !== "string" && "error" in response) {
		return res.status(404).json({ message: response.error });
	}
	res.status(200).json({ token: response, type: "instructor" });
});

export default router;
