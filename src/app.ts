import { appRoutes } from "@http/routes";
import fastify from "fastify";

export const app = fastify();

/* app.get("/home", async()=>{
  const users = await prisma.users.findMany()
  return users;
}) */

app.register(appRoutes);
