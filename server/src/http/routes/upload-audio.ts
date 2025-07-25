import { type FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { generateEmbeddings, transcribeAudio } from "../../services/gemini.ts";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schemas/index.ts";

export const uploadAudioRoutes: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/rooms/:roomId/audio",
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params;
      const audio = await request.file();
      if (!audio) throw new Error("Audio is required");
      const audioBuffer = await audio.toBuffer(); // waiting the whole file
      const audioAsBase64 = audioBuffer.toString("base64");
      const transcription = await transcribeAudio(
        audioAsBase64,
        audio.mimetype
      );
      const embeddings = await generateEmbeddings(transcription);
      const chunks = await db
        .insert(schema.audioChunks)
        .values({
          roomId,
          transcription,
          embeddings,
        })
        .returning();
      const chunk = chunks[0];
      if (!chunk) throw new Error("Fail to save the chunks");
      return reply.status(201).send({ chunkId: chunk.id });
    }
  );
};
