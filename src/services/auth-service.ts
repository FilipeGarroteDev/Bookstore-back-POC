import ConflictError from "../errors/ConflictError.js";
import { SignUpBody } from "../protocols";
import authRepository from "../repositories/auth-repository.js";
import bcrypt from "bcrypt";

async function searchUserAndSignIn(signUpData: SignUpBody) {
	const { name, email, password } = signUpData;
	const existentUser = await authRepository.searchUser(email);

	if (existentUser) {
		throw ConflictError();
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	await authRepository.insertNewUser({ name, email, password: hashedPassword });
}

const authService = {
	searchUserAndSignIn,
};
export default authService;
