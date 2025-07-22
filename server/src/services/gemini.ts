import { GoogleGenAI } from "@google/genai";
import { env } from "../env.ts";

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});
const model = "gemini-2.5-flash";

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: "Transcreva o áudio para português do Brasil. Seja preciso e natural na transcrição. Mantenha a pontuação adequada e divida o texto em parágrafos quando for apropriado.",
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  });
  if (!response.text) throw new Error("Fail to convert the audio");
  return response.text;
}

export async function generateEmbeddings(text: string) {
  const response = await gemini.models.embedContent({
    model: "text-embedding-004",
    contents: [{ text }],
    config: {
      taskType: "RETRIEVAL_DOCUMENT",
    },
  });
  if (!response.embeddings?.[0].values) {
    throw new Error("Fail to generate the embeddings");
  }
  return response.embeddings[0].values;
}

export async function generateAnswer(
  question: string,
  transcription: Array<string>
) {
  const context = transcription.join("\n\n");
  const prompt = `
    Com base no texto fornecido como contexto, responda a pergunta de forma clara e precisa em portugues do Brasil.

    Contexto:
    ${context}

    Pergunta:
    ${question}

    Intrucoes:
    - Use apenas informacoes contidas no contexto enviado;
    - Se a resposta nao for encontrada no contexto, apenas responda que nao possui informacoes suficientes para responder;
    - Seja objetivo;
    - Mantenha um tom educativo e profissional;
    - Cite trechos relevantes do contexto se apropriado;
    - Se for citar o contexto, utilize o termo "conteudo da aula";
  `.trim();
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  });
  if (!response.text) {
    throw new Error("Fail to generate an answer");
  }
  return response.text;
}
