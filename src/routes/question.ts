import { Request, Response, Router } from "express";
import Container from "typedi";
import { CourseService } from "../services/CourseService";
import { InstructorService } from "../services/InstructorService";
import { StudentService } from "../services/StudentService";
import verifyJwtToken from "../util/verifyJwtToken";

const router = Router();

router.get("/:questionId/replies", async (req: Request, res: Response) => {
	const { questionId } = req.params;
	const courseService = Container.get(CourseService);
	const answers = await courseService.getCourseAnswers(parseInt(questionId));
	res.json({ answers });
});

router.post("/", verifyJwtToken, async (req: Request, res: Response) => {
	const userId: number = (req as any).user;
	const { fileId, question } = req.body;
	const courseService = Container.get(CourseService);
	const createdQuestion = await courseService.addQuestion(
		fileId,
		userId,
		question
	);
	res.status(201).json({ msg: createdQuestion });
});

router.post("/answer", verifyJwtToken, async (req: Request, res: Response) => {
	const userId: number = (req as any).user;
	const { answer, questionId, type } = req.body;
	const courseService = Container.get(CourseService);
	const addedAnswer = await courseService.addAnswer(
		userId,
		type,
		answer,
		questionId
	);
	res.json({ msg: addedAnswer });
});

export default router;
