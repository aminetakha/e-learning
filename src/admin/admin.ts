import express, { Request, Response } from "express";
const admin = express();

admin.set("view engine", "ejs");

admin.get("/", (req: Request, res: Response) => {
	res.render("index");
});

export default admin;
