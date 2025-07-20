ALTER TABLE "audio_chunks" ALTER COLUMN "transcription" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "audio_chunks" ALTER COLUMN "transcription" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "audio_chunks" ADD COLUMN "embeddings" vector(768) NOT NULL;