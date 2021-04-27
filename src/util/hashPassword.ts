import { genSalt, hash } from "bcryptjs";

export default async (password: string) => {
	const salt = await genSalt(10);
	const hashedPassword = await hash(password, salt);
	return hashedPassword;
};
