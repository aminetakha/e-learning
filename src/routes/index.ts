import { Router } from "express";
import login from "./login";
import register from "./register";
import student from "./student";
import instructors from "./instructors";
import course from "./course";
import category from "./category";
import logout from "./logout";
import question from "./question";
import review from "./reviews";

const router = Router();

router.use("/students", student);
router.use("/login", login);
router.use("/register", register);
router.use("/instructors", instructors);
router.use("/courses", course);
router.use("/categories", category);
router.use("/questions", question);
router.use("/reviews", review);
router.use("/logout", logout);

export default router;
