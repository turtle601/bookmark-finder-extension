import React from 'react';

import Flex from '@/shared/ui/flex';
import Tag from '@/shared/ui/tag';

import { spacer } from '@/shared/config/styles';

import { ICategory } from '@/entities/category/category.type';
import SkeletonTag from '@/shared/ui/skeleton/skeletonTag';

interface ICategoryListProps {
  categories?: ICategory[];
  categoriesRef: React.MutableRefObject<
    Record<string, HTMLInputElement | null>
  >;
  isLoadingCategories: boolean;
  isAI: boolean;
  customTags: ICategory[];
}

const CategoryList: React.FC<ICategoryListProps> = ({
  categoriesRef,
  categories,
  isLoadingCategories,
  isAI,
  customTags,
}) => {
  if (isLoadingCategories) {
    return (
      <Flex
        as="ul"
        etcStyles={{
          marginTop: spacer['spacing2.5'],
          height: '120px',
        }}
        gap={spacer['spacing2.5']}
      >
        <SkeletonTag />
      </Flex>
    );
  }

  return (
    <Flex
      as="ul"
      data-testid={'categoryList'}
      etcStyles={{
        marginTop: spacer['spacing2.5'],
        height: '120px',
      }}
      gap={spacer['spacing2.5']}
    >
      {customTags.map((category) => {
        return (
          <li key={category.id}>
            <Tag
              ref={(el) => (categoriesRef.current[category.id] = el)}
              label={category.text}
            />
          </li>
        );
      })}
      {isAI &&
        categories?.map((category) => {
          return (
            <li key={category.id}>
              <Tag
                ref={(el) => (categoriesRef.current[category.id] = el)}
                label={category.text}
              />
            </li>
          );
        })}
    </Flex>
  );
};

export default CategoryList;
