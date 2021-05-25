import express, { Request, Response } from "express";
import adminRoute from "../routes/admin";
const admin = express();

admin.set("view engine", "ejs");

admin.use("/", adminRoute);

export default admin;
