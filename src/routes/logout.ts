import { Request, Response, Router } from "express";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
	res.cookie("jwt", "", { maxAge: 1 });
	res.json({ msg: "Logged out sucessfully" });
});

export default router;
