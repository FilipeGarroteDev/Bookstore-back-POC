import joi from "joi";

const SignUpSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required(),
	name: joi.string().required(),
});

const SignInSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required()
});

export { SignUpSchema, SignInSchema };
