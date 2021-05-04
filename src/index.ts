import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Request, Response } from "express";
import router from "./routes";
import cors from "cors";

createConnection()
	.then(async (connection) => {
		const app = express();
		// app.use("/frontend/uploads", express.static("frontend/uploads"));
		app.use(express.static("public/assets"));
		app.use(express.static("public/uploads"));
		app.use(cors());
		app.use(express.json());

		app.use("/", router);

		app.listen(5000, () => console.log("Server is running..."));
	})
	.catch((error) => console.log(error));
