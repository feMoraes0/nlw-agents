import { type FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schemas/index.ts";
import { z } from "zod/v4";
import { desc, eq } from "drizzle-orm";

export const getRoomQuestionsRoutes: FastifyPluginCallbackZod = (app) => {
  app.get(
    "/room/:roomId/questions",
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async ({ params }) => {
      const { roomId } = params;
      const results = await db
        .select({
          id: schema.questions.id,
          question: schema.questions.question,
          answer: schema.questions.answer,
          createAt: schema.questions.createAt,
        })
        .from(schema.questions)
        .where(eq(schema.questions.roomId, roomId))
        .orderBy(desc(schema.questions.createAt));
      return results;
    }
  );
};
