import { prisma } from "@lib/prisma";
import fastify from "fastify";
import z from "zod";

export const app = fastify();

/* app.get("/home", async()=>{
  const users = await prisma.users.findMany()
  return users;
}) */

app.post("/users", async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  });

  return reply.status(201).send();
});
