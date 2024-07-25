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
  removeCategory: (id: string) => VoidFunction;
  isAI: boolean;
  customTags: ICategory[];
}

const CategoryList: React.FC<ICategoryListProps> = ({
  categoriesRef,
  removeCategory,
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
    <div
      css={{
        height: '120px',
      }}
    >
      <Flex
        as="ul"
        direction={'row'}
        data-testid={'categoryList'}
        etcStyles={{
          marginTop: spacer['spacing2.5'],
          flexWrap: 'wrap',
          maxHeight: '120px',
          rowGap: spacer.spacing2,
          columnGap: spacer.spacing2,
          overflow: 'auto',
        }}
      >
        {customTags.map((category) => {
          return (
            <li key={category.id}>
              <Tag
                ref={(el) => (categoriesRef.current[category.id] = el)}
                label={category.text}
                externalAction={removeCategory(category.id)}
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
    </div>
  );
};

export default CategoryList;
