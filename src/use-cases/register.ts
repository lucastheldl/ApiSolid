import { prisma } from "@lib/prisma";
import { PrismaUsersRepository } from "@repositories/prisma-users-repository";
import { hash } from "bcryptjs";

interface registerUseCaseRequest {
  name: string;
  email: string;
  password: string;
}
export async function registerUseCase({
  name,
  email,
  password,
}: registerUseCaseRequest) {
  const password_hash = await hash(password, 5);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (userWithSameEmail) {
    throw new Error("e-mail already exists");
  }
  const prismaUsersRepository = new PrismaUsersRepository();

  await prismaUsersRepository.create({
    name,
    email,
    password_hash,
  });
}
