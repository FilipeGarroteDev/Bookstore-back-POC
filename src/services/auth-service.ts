import ConflictError from "../errors/ConflictError.js";
import { SignInBody, SignUpBody } from "../protocols";
import authRepository from "../repositories/auth-repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UnauthorizedError from "../errors/UnauthorizedError.js";

async function searchUserAndSignIn(signUpData: SignUpBody) {
	const { name, email, password } = signUpData;
	const existentUser = await authRepository.searchUser(email);

	if (existentUser) {
		throw ConflictError();
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	await authRepository.insertNewUser({ name, email, password: hashedPassword });
}

async function validateCredentialAndSignIn(signInData: SignInBody) {
	const { email, password } = signInData;
	const existentUser = await authRepository.searchUser(email);
	console.log("🚀 ~ file: auth-service.ts:24 ~ validateCredentialAndSignIn ~ existentUser", existentUser)

	if (!existentUser) {
		throw UnauthorizedError();
	}

	const validatePassword = await bcrypt.compare(password, existentUser.password);
	console.log("🚀 ~ file: auth-service.ts:31 ~ validateCredentialAndSignIn ~ validatePassword", validatePassword)

	if (!validatePassword) {
		throw UnauthorizedError();
	}

	const token = await createSession(existentUser.id);

	return token;
}

async function createSession(userId: number) {
  console.log(process.env.JWT_SECRET)
	const token = jwt.sign({ userId }, process.env.JWT_SECRET);
	await authRepository.createNewSession(userId, token);

	return token;
}

const authService = {
	searchUserAndSignIn,
	validateCredentialAndSignIn,
};

export default authService;
