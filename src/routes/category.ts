import { Request, Response, Router } from "express";
import Container from "typedi";
import { CategoryService } from "../services/CategoryService";
import { uploadUserImage } from "../util/uploadUserImage";
const router = Router();
const upload = uploadUserImage();

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

router.post("/add", upload.single("thumbnail"), async (req, res) => {
	const data = req.body;
	data.thumbnail = req.file.filename;
	const categoryService = Container.get(CategoryService);
	try {
		const response = await categoryService.add(data);
		res.status(201).json({ success: "Category added successfully" });
	} catch (err) {
		res.json({ error: "Error while adding category" });
	}
});

router.post("/remove/:id", async (req: Request, res: Response) => {
	const categoryService = Container.get(CategoryService);
	try {
		await categoryService.delete(parseInt(req.params.id));
		res.redirect("/dashboard");
	} catch (err) {
		console.log(err);
	}
});

export default router;
