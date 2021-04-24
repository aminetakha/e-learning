import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Request, Response } from "express";

createConnection()
	.then(async (connection) => {
		const app = express();
		app.use(express.json());

		app.get("/", (req: Request, res: Response) => {
			res.json({ msg: "hi" });
		});

		app.listen(5000, () => console.log("Server is running..."));
	})
	.catch((error) => console.log(error));
