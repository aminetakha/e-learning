import { compare } from "bcryptjs";

export default async (password: string, hashedPassword: string) => {
	const result = await compare(password, hashedPassword);
	return result;
};
