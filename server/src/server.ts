import { fastify } from "fastify";
import { fastifyMultipart } from "@fastify/multipart";
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
import { createQuestionRoutes } from "./http/routes/create-question.ts";
import { uploadAudioRoutes } from "./http/routes/upload-audio.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});
app.register(fastifyMultipart);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(getRoomsRoutes);
app.register(createRoomRoutes);
app.register(getRoomQuestionsRoutes);
app.register(createQuestionRoutes);
app.register(uploadAudioRoutes);

app.listen({ port: env.PORT }).then(() => {
  console.log("Server is running!");
});
