import { Router } from "express";
import login from "./login";
import register from "./register";
import student from "./student";

const router = Router();

router.use("/students", student);
router.use("/login", login);
router.use("/register", register);

export default router;
