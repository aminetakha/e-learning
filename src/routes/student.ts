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
		console.log(course.length);
		if (course.length > 0) {
			console.log("INSIDE IF");
			res.status(200).json({ success: "Found" });
		} else {
			console.log("INSIDE ELSE");
			res.status(404).json({ error: "Not Found" });
		}
	}
);

export default router;
