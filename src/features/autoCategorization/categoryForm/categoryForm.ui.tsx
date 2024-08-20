import React, { useEffect } from 'react';
import { css } from '@emotion/react';

import { spacer } from '@/shared/config/styles';

import AIIcon from '@/shared/config/assets/ai.svg';

import Tag from '@/shared/ui/tag';
import Flex from '@/shared/ui/flex';
import Toggle from '@/shared/ui/toggle';
import Spacer from '@/shared/ui/spacer';
import SkeletonTag from '@/shared/ui/skeleton/skeletonTag';
import ModalLayer from '@/shared/ui/modalLayer';
import Button from '@/shared/ui/button';
import OpenClassifyBookmarkForm from '@/app/modal-router/openClassifyBookmarkForm.ui';

import { ErrorMessage, Input } from '@/shared/ui/input';

import { getOutlineFieldStyle } from '@/shared/ui/input/input.style';
import { FormRefValueType, useForm } from '@/shared/hooks/useForm';
import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/entities/category';
import { useArray } from '@/shared/hooks/useArray';
import { ICategory } from '@/entities/category/category.type';
import { useBoolean } from '@/shared/hooks/useBoolean';

import { useClassifyAIBookmarks } from '@/entities/classify';

const SkeletonCategoryList = () => {
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
};

const CategoryForm: React.FC = () => {
  const { errorMessage, register, handleOnAction } = useForm();

  const { mutate: classifyAIBookmarks } = useClassifyAIBookmarks();

  const { value: isAI, toggle: toggleAI } = useBoolean(true);

  const { isLoading: isLoadingCategories, data: fetchedCategories } = useQuery(
    categoryService.queryOptions(),
  );

  const {
    value: categories,
    setValue: setCategories,
    unshift: addCustomCategory,
    remove: removeCustomCategory,
  } = useArray<ICategory>(fetchedCategories || []);

  useEffect(() => {
    const nonDuplicatedCategories = [...new Set([...categories])];

    if (nonDuplicatedCategories.length !== categories.length) {
      setCategories(nonDuplicatedCategories);
    }
  }, [categories, isAI, setCategories]);

  const handleInputEnter: React.KeyboardEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const validateLength = (formRefValue: FormRefValueType) => {
      return formRefValue['category-form'].element.value.length > 0;
    };

    const validateNonDuplicate = (formRefValue: FormRefValueType) => {
      const inputValue = formRefValue['category-form'].element.value;

      const tagList = Object.values(formRefValue).filter(({ element }) => {
        return element.name === 'category-tag';
      });

      const isDuplicate = tagList.some((tag) => {
        return tag.element.value === inputValue;
      });

      return !isDuplicate;
    };

    const action = (formRefValue: FormRefValueType) => {
      addCustomCategory({
        id: formRefValue['category-form'].element.value,
        text: formRefValue['category-form'].element.value,
      });
    };

    if (e.key === 'Enter') {
      e.preventDefault();

      handleOnAction({
        action,
        wholeValidate: [
          {
            fn: validateLength,
            errorMessage: '최소 한 글자 이상의 카테고리를 만들어주세요.',
          },
          {
            fn: validateNonDuplicate,
            errorMessage: '중복되는 카테고리는 만들 수 없습니다.',
          },
        ],
      });
    }
  };

  const handleSubmitClassifyFolder = () => {
    classifyAIBookmarks({
      categories: categories.map((category) => category.text),
    });
  };

  return (
    <Flex as="article" direction="column">
      <Flex align={'center'} justify={'space-between'}>
        <Input
          {...register({ id: 'category-form' })}
          type="text"
          placeholder="카테고리를 입력하세요"
          onKeyUp={handleInputEnter}
          etcStyles={{
            ...getOutlineFieldStyle(),
          }}
        />
        <Flex align={'center'} gap={spacer.spacing2}>
          <AIIcon />
          <Toggle isChecked={isAI} onClick={toggleAI} />
        </Flex>
      </Flex>
      <Spacer direction="vertical" space={spacer['spacing2.5']} />
      <div
        css={css({
          width: '100%',
          height: '120px',
        })}
      >
        <Flex
          as="ul"
          etcStyles={{
            gap: '4px',
            maxHeight: '120px',
            flexWrap: 'wrap',
            overflow: 'auto',
          }}
        >
          {isLoadingCategories && <SkeletonCategoryList />}
          {categories.map((category) => {
            return (
              <Tag
                {...register({ id: category.id, name: 'category-tag' })}
                key={category.id}
                text={category.text}
                externalAction={() => removeCustomCategory(category.id)}
              />
            );
          })}
        </Flex>
      </div>
      <ErrorMessage message={errorMessage} />
      <OpenClassifyBookmarkForm
        disabled={categories.length === 0}
        externalAction={handleSubmitClassifyFolder}
        etcStyles={{
          width: '100%',
        }}
      >
        <ModalLayer.Closer
          modalType="sidebar-panel"
          disabled={categories.length === 0}
          etcStyles={{
            width: '100%',
          }}
        >
          <Button
            disabled={categories.length === 0}
            kind={'default'}
            etcStyles={{
              width: '100%',
              padding: spacer.spacing3,
            }}
          >
            폴더 분류하기
          </Button>
        </ModalLayer.Closer>
      </OpenClassifyBookmarkForm>
    </Flex>
  );
};

export default CategoryForm;
