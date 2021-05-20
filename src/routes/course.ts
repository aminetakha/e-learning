import { Request, Response, Router } from "express";
import { readdirSync } from "fs";
import Container from "typedi";
import { CourseService } from "../services/CourseService";
import { FileService } from "../services/FileService";
import { uploadUserImage } from "../util/uploadUserImage";
const router = Router();
const upload = uploadUserImage();

router.get("/category/:category", async (req: Request, res: Response) => {
	const courseService = Container.get(CourseService);
	const { category } = req.params;
	const courses = await courseService.getCoursesByCategory(category);
	res.json(courses);
});

router.post(
	"/create",
	upload.single("file"),
	async (req: Request, res: Response) => {
		const data = req.body;
		data.instructor = 1;
		data.thumbnail = req.file.filename;
		const courseService = Container.get(CourseService);
		const course = await courseService.createCourse(data);
		res.json({ courseId: course });
	}
);

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

router.get("/:title/files", async (req: Request, res: Response) => {
	const courseService = Container.get(CourseService);
	const { title } = req.params;
	const courses = await courseService.getCourseFilesByTitle(title);
	res.json(courses);
});

router.post("/:id/section", async (req: Request, res: Response) => {
	const courseService = Container.get(CourseService);
	const { id } = req.params;
	const { title } = req.body;
	const section = await courseService.addSectionForCourse(
		parseInt(id),
		title
	);
	res.json({ msg: section });
});

router.patch("/:id/section", async (req: Request, res: Response) => {
	try {
		const courseService = Container.get(CourseService);
		const { id } = req.params;
		const { title } = req.body;
		await courseService.updateSectionName(parseInt(id), title);
		res.json({ success: "Updated successfully" });
	} catch (error) {
		res.json({ error: "An erroc occured" });
	}
});

router.post(
	"/:id/file",
	upload.single("file"),
	async (req: Request, res: Response) => {
		const fileService = Container.get(FileService);
		const { id } = req.params;
		const filename = req.file.filename;
		const file = await fileService.uploadFileForSection(
			parseInt(id),
			filename
		);
		res.json({ msg: file });
	}
);

export default router;
