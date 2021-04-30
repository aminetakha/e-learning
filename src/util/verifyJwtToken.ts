import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface RequestWithUser extends Request {
	user: number;
}

export default async (
	req: RequestWithUser,
	res: Response,
	next: NextFunction
) => {
	const token = req.header("X-TOKEN");
	try {
		const decoded = await verify(token, process.env.JWT_PRIVATE_KEY);
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: "Invalid" });
	}
};
