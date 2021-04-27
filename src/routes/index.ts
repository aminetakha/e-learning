import { Router } from "express";
import login from "./login";
import student from "./student";

const router = Router();

router.use("/students", student);
router.use("/login", login);

export default router;
