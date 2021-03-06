import { Request, Response, Router } from "express";
import Container from "typedi";
import { Admin } from "../entity/Admin";
import { CourseService } from "../services/CourseService";
import { InstructorService } from "../services/InstructorService";
import { StudentService } from "../services/StudentService";
import bcrypt from "bcryptjs";
import { getRepository } from "typeorm";
import createJwtToken from "../util/createJwtToken";
import verifyAdminJwt from "../util/verifyAdminJwt";
import checkAdmin from "../util/checkAdmin";
import { CategoryService } from "../services/CategoryService";
const router = Router();

router.get("/", checkAdmin, (req: any, res: Response) => {
	res.render("index");
});

router.get("/category", (req, res) => {
	res.render("category");
});

router.post("/login", async (req: any, res: Response) => {
	const { email, password } = req.body;

	const admin = await getRepository(Admin).findOne({
		email: email.trim(),
	});

	if (admin) {
		const result = await bcrypt.compare(password, admin.password);
		if (result) {
			const token = await createJwtToken({ user: admin.id });
			res.cookie("jwt", token, { httpOnly: true });
			res.status(200).json({ admin: admin.id });
		} else {
			res.status(400).json({ error: "Invalid password" });
		}
	} else {
		res.status(400).json({ error: "Invalid email" });
	}
});

router.post("/signup", async (req, res) => {
	const admin = new Admin();
	admin.email = "admin@gmail.com";
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash("123123", salt);
	admin.password = hash;
	await getRepository(Admin).save(admin);
});

router.get("/dashboard", verifyAdminJwt, async (req: any, res) => {
	const studentService = Container.get(StudentService);
	const instructorService = Container.get(InstructorService);
	const courseService = Container.get(CourseService);
	const categoryService = Container.get(CategoryService);

	const students = await studentService.getAllStudents();
	const instructors = await instructorService.getAllInstructors();
	const courses = await courseService.getAllCourses();
	const totalEarning = await courseService.getTotalEarning();
	const totalStudentCount = students.length;
	const totalInstructorCount = instructors.length;
	const totalCoursesCount = courses.length;
	const categories = await categoryService.getAll();

	res.render("dashboard", {
		students,
		instructors,
		courses,
		categories,
		totalEarning,
		totalStudentCount,
		totalInstructorCount,
		totalCoursesCount,
	});
});

router.get("/instructors", verifyAdminJwt, async (req: any, res) => {
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

	res.render("instructors", {
		instructors,
		totalEarning,
		totalStudentCount,
		totalInstructorCount,
		totalCoursesCount,
	});
});

router.get("/courses", verifyAdminJwt, async (req: any, res) => {
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

	res.render("courses", {
		courses,
		totalEarning,
		totalStudentCount,
		totalInstructorCount,
		totalCoursesCount,
	});
});

router.get("/categories", verifyAdminJwt, async (req: any, res) => {
	const studentService = Container.get(StudentService);
	const instructorService = Container.get(InstructorService);
	const courseService = Container.get(CourseService);
	const categoryService = Container.get(CategoryService);

	const students = await studentService.getAllStudents();
	const instructors = await instructorService.getAllInstructors();
	const courses = await courseService.getAllCourses();
	const totalEarning = await courseService.getTotalEarning();
	const totalStudentCount = students.length;
	const totalInstructorCount = instructors.length;
	const totalCoursesCount = courses.length;
	const categories = await categoryService.getAll();

	res.render("categories", {
		categories,
		totalEarning,
		totalStudentCount,
		totalInstructorCount,
		totalCoursesCount,
	});
});

router.get("/logout", (req, res) => {
	res.cookie("jwt", "", { maxAge: 1 });
	res.redirect("/");
});

export default router;
