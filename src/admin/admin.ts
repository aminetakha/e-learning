import express from "express";
import adminRoute from "../routes/admin";
const admin = express();

admin.use(express.json());
admin.use(express.urlencoded({ extended: false }));
admin.set("view engine", "ejs");

admin.use("/", adminRoute);

export default admin;
