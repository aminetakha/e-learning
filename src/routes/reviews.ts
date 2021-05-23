import { Request, Response, Router } from "express";
import Container from "typedi";
import { ReviewService } from "../services/ReviewService";
import verifyJwtToken from "../util/verifyJwtToken";

const router = Router();

router.post("/", verifyJwtToken, async (req: Request, res: Response) => {
	const { rating, review, courseId } = req.body;
	const studentId: number = (req as any).user;
	const reviewService = Container.get(ReviewService);
	try {
		const response = await reviewService.addReview(
			rating,
			review,
			courseId,
			studentId
		);
		res.json({ success: "Review Added Successfully" });
	} catch (error) {
		res.json({ error: "Error occured while adding review" });
	}
});

export default router;
