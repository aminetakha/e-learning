import { Router } from "express";
import login from "./login";
import register from "./register";
import student from "./student";
import instructors from "./instructors";
import course from "./course";
import category from "./category";

const router = Router();

router.use("/students", student);
router.use("/login", login);
router.use("/register", register);
router.use("/instructors", instructors);
router.use("/courses", course);
router.use("/categories", category);

export default router;
