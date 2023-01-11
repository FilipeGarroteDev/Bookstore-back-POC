import { Request, Response } from "express";
import { SignUpBody } from "../protocols";
import httpStatus from "http-status";
import authService from "../services/auth-service.js";

export default async function signUp(req: Request, res: Response) {
	const signUpData: SignUpBody = req.body;
  
	try {
    await authService.searchUserAndSignIn(signUpData);
    res.sendStatus(httpStatus.CREATED)
	} catch (error) {
    if(error.name === "ConflictError"){
      res.sendStatus(httpStatus.CONFLICT)
    } else {
      res.sendStatus(httpStatus.BAD_REQUEST)
    }
  }
}
