import { prisma } from "@lib/prisma";

import { hash } from "bcryptjs";

interface registerUseCaseRequest {
  name: string;
  email: string;
  password: string;
}
export class RegisterUseCase {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: registerUseCaseRequest) {
    const password_hash = await hash(password, 5);

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userWithSameEmail) {
      throw new Error("e-mail already exists");
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
