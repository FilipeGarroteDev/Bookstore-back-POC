import express from "express";
import validateSchema from "../middlewares/validation-middleware.js";
import { SignInSchema, SignUpSchema } from "../schemas/auth-schemas.js";
import { signIn, signUp } from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/signup", validateSchema(SignUpSchema), signUp);
router.post("/signin", validateSchema(SignInSchema), signIn);

export default router;
