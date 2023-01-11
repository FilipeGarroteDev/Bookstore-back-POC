import { Request, Response } from "express";
import { SignUpBody } from "../protocols";
import httpStatus from "http-status";

export default async function signUp(req: Request, res: Response) {
	const { email, password, name } = req.body as SignUpBody;
  
	try {
    
    res.sendStatus(httpStatus.CREATED)
	} catch (error) {
    if(error.message === "ConflictError"){
      res.sendStatus(httpStatus.CONFLICT)
    } else {
      res.sendStatus(httpStatus.BAD_REQUEST)
    }
  }
}
