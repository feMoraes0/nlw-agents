import { fastify } from "fastify";
import {
  type ZodTypeProvider,
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import { fastifyCors } from "@fastify/cors";
import { env } from "./env.ts";
import { getRoomsRoutes } from "./http/routes/get-rooms.ts";
import { createRoomRoutes } from "./http/routes/create-room.ts";
import { getRoomQuestionsRoutes } from "./http/routes/get-room-questions.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(getRoomsRoutes);
app.register(createRoomRoutes);
app.register(getRoomQuestionsRoutes);

app.listen({ port: env.PORT }).then(() => {
  console.log("Server is running!");
});
