import { geminiError } from '@/shared/lib/fetch/fetch.error';
import { GoogleGenerativeAI } from '@google/generative-ai';

// eslint-disable-next-line @rushstack/typedef-var
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

interface ICreateGeminiRequestParameter {
  prompt: string;
}

export const createGeminiRequest = async ({
  prompt,
}: ICreateGeminiRequestParameter) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const response = (await model.generateContent(prompt)).response;
    return response.text();
  } catch (error: unknown) {
    throw geminiError({ error });
  }
};
