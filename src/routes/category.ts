import { Request, Response, Router } from "express";
import Container from "typedi";
import { CategoryService } from "../services/CategoryService";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
	const categoryService = Container.get(CategoryService);
	const categories = await categoryService.getAll();
	res.json({ categories });
});

router.get("/:title", async (req: Request, res: Response) => {
	const { title } = req.params;
	const categoryService = Container.get(CategoryService);
	const category = await categoryService.getByTitle(title);
	res.json({ category });
});

export default router;
