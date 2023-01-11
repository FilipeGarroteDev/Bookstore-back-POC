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

async function createNewSession(userId: number, token: string) {
	return prisma.sessions.create({
		data: {
			userId,
			token,
		},
	});
}

const authRepository = {
	searchUser,
	insertNewUser,
  createNewSession
};

export default authRepository;
