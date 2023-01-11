import express from "express";
import validateSchema from "../middlewares/validation-middleware";
import { SignInSchema, SignUpSchema } from "../schemas/auth-schemas";

const router = express.Router();

router.get("/signup", validateSchema(SignUpSchema),  );
router.get("/signin", validateSchema(SignInSchema), );

export default router;
