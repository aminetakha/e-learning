import Container from "typedi";
import { LoginDto } from "../dto/loginDto";
import { LoginService } from "../services/LoginService";

export default (data) => {
	const { email, password, cart } = data;
	const credentials: LoginDto = { email, password, cart };
	const loginService = Container.get(LoginService);

	return { credentials, loginService };
};
