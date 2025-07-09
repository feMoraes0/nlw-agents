import { type FastifyPluginCallbackZod } from "fastify-type-provider-zod";

export const getRoomsRoutes: FastifyPluginCallbackZod = (app) => {
  app.get("/rooms", () => {
    return "hello world";
  });
};
