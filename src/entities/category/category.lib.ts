import { ICategory } from '@/entities/category/category.type';

export const mapAICategorList = (aiResponse: string): ICategory[] => {
  const result = aiResponse.replace(/^```json|```$/g, '');

  return JSON.parse(result);
};
