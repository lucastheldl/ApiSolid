import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

export const app = fastify();

const prisma = new PrismaClient();


/* app.get("/home", async()=>{
  const users = await prisma.users.findMany()
  return users;
}) */