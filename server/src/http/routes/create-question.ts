import { type FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schemas/index.ts";

export const createQuestionRoutes: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/room/:roomId/questions",
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
        body: z.object({
          question: z.string().min(1),
        }),
      },
    },
    async (request, reply) => {
      const { question } = request.body;
      const { roomId } = request.params;
      const result = await db
        .insert(schema.questions)
        .values({ roomId, question })
        .returning();
      const insertedQuestion = result[0];
      if (!insertedQuestion) {
        throw new Error("Failed to insert the new question");
      }
      return reply.status(201).send({ questionId: insertedQuestion.id });
    }
  );
};
