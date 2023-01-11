import express from "express";
import signUp from "../controllers/auth-controller.js";
import validateSchema from "../middlewares/validation-middleware.js";
import { SignInSchema, SignUpSchema } from "../schemas/auth-schemas.js";

const router = express.Router();

router.post("/signup", validateSchema(SignUpSchema), signUp);
router.get("/signin", validateSchema(SignInSchema));

export default router;
