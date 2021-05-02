import { Request, Response, Router } from "express";
import Container from "typedi";
import { CourseService } from "../services/CourseService";
const router = Router();

router.get("/category/:category", async (req: Request, res: Response) => {
	const courseService = Container.get(CourseService);
	const { category } = req.params;
	const courses = await courseService.getCoursesByCategory(category);
	res.json(courses);
});

router.get("/price/:price", async (req: Request, res: Response) => {
	const courseService = Container.get(CourseService);
	const { price } = req.params;
	const courses = await courseService.getCourseByPrice(parseInt(price));
	res.json(courses);
});

router.get("/instructor/:instructor", async (req: Request, res: Response) => {
	const courseService = Container.get(CourseService);
	const { instructor } = req.params;
	const courses = await courseService.getCoursesByInstructor(instructor);
	res.json(courses);
});

router.get("/popular", async (req: Request, res: Response) => {
	const courseService = Container.get(CourseService);
	const courses = await courseService.getMostPopular();
	res.json(courses);
});

router.get("/latest", async (req: Request, res: Response) => {
	const courseService = Container.get(CourseService);
	const courses = await courseService.getLatest();
	res.json(courses);
});

router.get("/:title", async (req: Request, res: Response) => {
	const courseService = Container.get(CourseService);
	const { title } = req.params;
	const courses = await courseService.getCourseByTitle(title);
	res.json(courses);
});

export default router;
