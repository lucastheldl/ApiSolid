import { z } from "zod";

import { FastifyRequest, FastifyReply } from "fastify";
import { AuthenticateUseCase } from "@use-cases/authenticate";
import { PrismaUsersRepository } from "@repositories/prisma/prisma-users-repository";
import { InvalidCredentialsError } from "@use-cases/errors/invalid-credentials-error";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

    await authenticateUseCase.execute({ email, password });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      // 400: bad request
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
  // 200:success
  return reply.status(200).send();
}
