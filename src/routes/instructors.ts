import { Request, Response, Router } from "express";
import Container from "typedi";
import { InstructorDto } from "../dto/instructorDto";
import { InstructorService } from "../services/InstructorService";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
	const instructorService = Container.get(InstructorService);
	const data = await instructorService.getAll();
	res.json({ data });
});

router.get("/:id", async (req: Request, res: Response) => {
	const instructorService = Container.get(InstructorService);
	const data = await instructorService.findById(parseInt(req.params.id));
	res.json({ data });
});

router.get("/:id/courses", async (req: Request, res: Response) => {
	const instructorService = Container.get(InstructorService);
	const data = await instructorService.findUserCourses(
		parseInt(req.params.id)
	);
	res.json({ data });
});

router.put("/:id", async (req: Request, res: Response) => {
	const {
		username,
		about,
		website,
		github,
		twitter,
		youtube,
	} = req.body as InstructorDto;
	const instructorService = Container.get(InstructorService);
	const data = await instructorService.update(parseInt(req.params.id), {
		username,
		about,
		website,
		github,
		twitter,
		youtube,
	});
	res.json({ data });
});

router.delete("/:id", async (req: Request, res: Response) => {
	const instructorService = Container.get(InstructorService);
	await instructorService.delete(parseInt(req.params.id));
	res.json({ message: "Account has been deleted successfully" });
});

export default router;
