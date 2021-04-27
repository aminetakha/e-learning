import multer from "multer";
import { v4 as uuidv4 } from "uuid";

export const uploadUserImage = () => {
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, "public/uploads");
		},
		filename: (req, file, cb) => {
			const ext = file.originalname.split(".").reverse()[0];
			cb(null, uuidv4() + "." + ext);
		},
	});
	const upload = multer({ storage });
	return upload;
};
