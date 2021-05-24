import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import router from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import vhost from "vhost";
import admin from "./admin/admin";

createConnection()
	.then(async (connection) => {
		const app = express();
		app.use(express.static("public/assets"));
		app.use(express.static("public/uploads"));
		app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
		app.use(express.json());
		app.use(cookieParser());

		app.use(vhost("admin.localhost", admin));
		app.use("/", router);

		app.listen(5000, () => console.log("Server is running..."));
	})
	.catch((error) => console.log(error));
