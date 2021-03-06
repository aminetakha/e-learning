import { Request, Response, Router } from "express";
import Container from "typedi";
import { StudentService } from "../services/StudentService";
import verifyJwtToken from "../util/verifyJwtToken";

const router = Router();

router.get("/cart", verifyJwtToken, async (req: Request, res: Response) => {
	const id: number = (req as any).user;
	const studentService = Container.get(StudentService);
	const cart = await studentService.getStudentCart(id);
	res.json({
		cart,
	});
});

router.post("/cart", verifyJwtToken, async (req: Request, res: Response) => {
	const userId: number = (req as any).user;
	const { courseId } = req.body;
	const studentService = Container.get(StudentService);

	try {
		await studentService.addToCart(parseInt(courseId), userId);
		res.json({ success: "Course added to cart" });
	} catch (error) {
		res.json(500).json({ error: "An error occured" });
	}
});

router.post("/:id", async (req: Request, res: Response) => {
	const { username, country } = req.body;
	const studentService = Container.get(StudentService);
	const data = await studentService.update(parseInt(req.params.id), {
		username,
		country,
	});
	res.json({ data });
});

router.delete(
	"/cart/course/:courseId",
	verifyJwtToken,
	async (req: Request, res: Response) => {
		const { courseId } = req.params;
		const userId: number = (req as any).user;
		const studentService = Container.get(StudentService);
		try {
			await studentService.removeItemFromCart(parseInt(courseId), userId);
			res.json({ success: "Course removed from cart" });
		} catch (error) {
			res.json(500).json({ error: "An error occured" });
		}
	}
);

router.get(
	"/cart/course/:courseId",
	verifyJwtToken,
	async (req: Request, res: Response) => {
		const { courseId } = req.params;
		const userId: number = (req as any).user;
		const studentService = Container.get(StudentService);
		const course = await studentService.findItemInCart(
			parseInt(courseId),
			userId
		);
		if (course.length > 0) {
			res.status(200).json({ success: "Found" });
		} else {
			res.status(404).json({ error: "Not Found" });
		}
	}
);

router.get(
	"/my-courses",
	verifyJwtToken,
	async (req: Request, res: Response) => {
		const userId: number = (req as any).user;
		const studentService = Container.get(StudentService);
		const courses = await studentService.getCurrentUserCourses(userId);
		res.status(200).json({ courses });
	}
);

router.get(
	"/verify/:courseId",
	verifyJwtToken,
	async (req: Request, res: Response) => {
		const userId: number = (req as any).user;
		const { courseId } = req.params;
		const studentService = Container.get(StudentService);
		const count = await studentService.verifyCourseEnrollment(
			userId,
			parseInt(courseId)
		);
		res.json({ count });
	}
);

router.post("/remove/:id", async (req, res) => {
	const { id } = req.params;
	const studentService = Container.get(StudentService);
	try {
		await studentService.removeStudent(parseInt(id));
		res.redirect("/dashboard");
	} catch (err) {
		console.log(err);
	}
});

export default router;
