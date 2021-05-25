import { Request, Response, Router } from "express";
import Container from "typedi";
import { CourseService } from "../services/CourseService";
import { InstructorService } from "../services/InstructorService";
import { StudentService } from "../services/StudentService";
const router = Router();

router.get("/", (req: Request, res: Response) => {
	res.render("index");
});

router.post("/login", async (req: Request, res: Response) => {
	res.json({ msg: "Admin login" });
});

router.get("/dashboard", async (req, res) => {
	const studentService = Container.get(StudentService);
	const instructorService = Container.get(InstructorService);
	const courseService = Container.get(CourseService);

	const students = await studentService.getAllStudents();
	const instructors = await instructorService.getAllInstructors();
	const courses = await courseService.getAllCourses();
	const totalEarning = await courseService.getTotalEarning();
	const totalStudentCount = students.length;
	const totalInstructorCount = instructors.length;
	const totalCoursesCount = courses.length;

	res.render("dashboard", {
		students,
		instructors,
		courses,
		totalEarning,
		totalStudentCount,
		totalInstructorCount,
		totalCoursesCount,
	});
});

export default router;
