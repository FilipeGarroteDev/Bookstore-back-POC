import prisma from "../db/db.js";
import { SignUpBody } from "../protocols.js";

async function searchUser(email: string) {
	return prisma.users.findFirst({
		where: {
			email,
		},
	});
}

async function insertNewUser(body: SignUpBody) {
	return prisma.users.create({
		data: body,
	});
}

const authRepository = {
	searchUser,
  insertNewUser
};

export default authRepository;
