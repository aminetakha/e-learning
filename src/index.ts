import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Request, Response } from "express";
import router from "./routes";

createConnection()
	.then(async (connection) => {
		const app = express();
		app.use(express.json());

		app.use("/", router);

		app.listen(5000, () => console.log("Server is running..."));
	})
	.catch((error) => console.log(error));
