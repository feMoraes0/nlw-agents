import { pgTable, timestamp, uuid, vector } from "drizzle-orm/pg-core";
import { rooms } from "./rooms.ts";

export const audioChunks = pgTable("audio_chunks", {
  id: uuid().primaryKey().defaultRandom(),
  roomId: uuid()
    .references(() => rooms.id)
    .notNull(),
  transcription: vector({ dimensions: 768 }).notNull(),
  createAt: timestamp().defaultNow().notNull(),
});
