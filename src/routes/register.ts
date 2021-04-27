import { Request, Response, Router } from "express";
import Container from "typedi";
import { RegisterDto } from "../dto/registerDto";
import { RegisterStudentDto } from "../dto/registerStudentDto";
import { RegisterService } from "../services/RegisterService";
import { uploadUserImage } from "../util/uploadUserImage";

const router = Router();
const upload = uploadUserImage();

router.post(
	"/instructor",
	upload.single("photo"),
	async (req: Request, res: Response) => {
		const instructor: RegisterDto = {
			...req.body,
			photo: req.file.path,
		};
		const registerService = Container.get(RegisterService);
		const response = await registerService.registerUser(instructor);

		if (typeof response !== "string" && "error" in response) {
			return res.status(400).json({ error: response.error });
		}

		res.status(201).json({ instructor: response.instructor });
	}
);

router.post(
	"/student",
	upload.single("photo"),
	async (req: Request, res: Response) => {
		const student: RegisterStudentDto = {
			...req.body,
			photo: req.file.path,
		};
		const registerService = Container.get(RegisterService);
		const response = await registerService.registerStudent(student);

		if (typeof response !== "string" && "error" in response) {
			return res.status(400).json({ error: response.error });
		}

		res.status(201).json({ student: response.student });
	}
);

export default router;
