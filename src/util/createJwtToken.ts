import { sign } from "jsonwebtoken";

interface Payload {
	user: number;
}

export default async (payload: Payload) => {
	const token: string = await sign(payload, process.env.JWT_PRIVATE_KEY);
	return token;
};
