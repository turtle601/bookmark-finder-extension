import { ICategoryBookmark } from './classify.type';

export const mapAIBookmarks = (aiResponse: string): ICategoryBookmark[] => {
  const result = aiResponse.replace(/^```json|```$/g, '');

  return JSON.parse(result);
};
