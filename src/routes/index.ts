import { Router } from "express";
import login from "./login";
import register from "./register";
import student from "./student";
import instructors from "./instructors";
import course from "./course";

const router = Router();

router.use("/students", student);
router.use("/login", login);
router.use("/register", register);
router.use("/instructors", instructors);
router.use("/courses", course);

export default router;
