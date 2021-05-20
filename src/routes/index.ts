import { Router } from "express";
import login from "./login";
import register from "./register";
import student from "./student";
import instructors from "./instructors";
import course from "./course";
import category from "./category";
<<<<<<< HEAD
=======
import logout from "./logout";
import question from "./question";
<<<<<<< HEAD
>>>>>>> 28ca805... Added question and answers functionality
=======
>>>>>>> 28ca805... Added question and answers functionality

const router = Router();

router.use("/students", student);
router.use("/login", login);
router.use("/register", register);
router.use("/instructors", instructors);
router.use("/courses", course);
router.use("/categories", category);
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 28ca805... Added question and answers functionality
router.use("/questions", question);
router.use("/logout", logout);
>>>>>>> 28ca805... Added question and answers functionality

export default router;
