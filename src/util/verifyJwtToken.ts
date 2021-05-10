import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default async (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.jwt;
	console.log("token", token);
	try {
		const decoded = await verify(token, process.env.JWT_PRIVATE_KEY);
		const id = decoded.user;
		(req as any).user = id;

		next();
	} catch (err) {
		res.status(401).json({ error: "Invalid" });
	}
};
