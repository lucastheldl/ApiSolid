import { env } from "@env";
import { appRoutes } from "@http/routes";
import fastify from "fastify";
import { ZodError } from "zod";

export const app = fastify();

/* app.get("/home", async()=>{
  const users = await prisma.users.findMany()
  return users;
}) */

app.register(appRoutes);
// request removed since its not beeing used \/
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "validation error", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.log(error);
  } else {
    // TODO: In the future use a externall tool to handle logs
  }

  return reply.status(500).send({ message: "Internal server error" });
});
