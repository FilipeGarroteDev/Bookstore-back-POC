import { Request, Response } from "express";
import { SignInBody, SignUpBody } from "../protocols";
import httpStatus from "http-status";
import authService from "../services/auth-service.js";

export async function signUp(req: Request, res: Response) {
	const signUpData: SignUpBody = req.body;

	try {
		await authService.searchUserAndSignIn(signUpData);
		res.sendStatus(httpStatus.CREATED);
	} catch (error) {
		if (error.name === "ConflictError") {
			res.status(httpStatus.CONFLICT).send(error.signUpMessage);
		} else {
			res.sendStatus(httpStatus.BAD_REQUEST);
		}
	}
}

export async function signIn(req: Request, res: Response) {
	const signInData: SignInBody = req.body; 

	try {
		const token = await authService.validateCredentialAndSignIn(signInData);
		res.status(httpStatus.OK).send(token);
	} catch (error) {
		if (error.name === "UnauthorizedError") {
			res.status(httpStatus.UNAUTHORIZED).send(error.signInMessage);
		} else {
			res.sendStatus(httpStatus.BAD_REQUEST);
		}
	}
}
