import React from 'react';
import { css } from '@emotion/react';

import { spacer } from '@/shared/config/styles';

import Tag from '@/shared/ui/tag';
import Flex from '@/shared/ui/flex';

import Spacer from '@/shared/ui/spacer';

import Button from '@/shared/ui/button';
import Center from '@/shared/ui/center';
import ModalLayer from '@/shared/ui/modalLayer';
import RefreshIcon from '@/shared/config/assets/reset.svg';

import OpenClassifyBookmarkForm from '@/app/modal-router/openClassifyBookmarkForm.ui';

import { ErrorMessage, Input } from '@/shared/ui/input';

import { useForm } from '@/shared/hooks/useForm';
import { useArray } from '@/shared/hooks/useArray';

import { useClassifyAIBookmarks } from '@/entities/classify';

import type { FormRefValueType } from '@/shared/hooks/useForm';
import type { ICategory } from '@/entities/category/category.type';

const CategoryForm: React.FC = () => {
  const { errorMessage, register, handleOnAction } = useForm();

  const { mutate: classifyAIBookmarks } = useClassifyAIBookmarks();

  const {
    value: categories,
    unshift: addCategory,
    remove: removeCategory,
    removeAll: removeAllCategories,
  } = useArray<ICategory>([]);

  const isDisabled = categories.length === 0;

  const handleInputEnter: React.KeyboardEventHandler<HTMLInputElement> = (
    e,
  ) => {
    if (e.key === 'Enter') {
      e.stopPropagation();

      if (e.nativeEvent.isComposing) {
        return;
      }

      handleOnAction({
        action: (formRefValue: FormRefValueType) => {
          addCategory({
            id: formRefValue['category-form'].element.value,
            text: formRefValue['category-form'].element.value,
          });
        },

        wholeValidate: [
          {
            fn: (formRefValue: FormRefValueType) => {
              return formRefValue['category-form'].element.value.length > 0;
            },
            errorMessage: '최소 한 글자 이상의 카테고리를 만들어주세요.',
          },
          {
            fn: (formRefValue: FormRefValueType) => {
              const inputValue = formRefValue['category-form'].element.value;

              const tagList = Object.values(formRefValue).filter(
                (formRefValue) => {
                  return (
                    formRefValue.element &&
                    formRefValue.element.name === 'category-tag'
                  );
                },
              );

              const isDuplicate = tagList.some((tag) => {
                return tag.element.value === inputValue;
              });

              return !isDuplicate;
            },
            errorMessage: '중복되는 카테고리는 만들 수 없습니다.',
          },
        ],
      });
    }
  };

  const handleSubmitClassifyFolder = () => {
    const submitCategories = categories.map((category) => category.text);

    classifyAIBookmarks({
      categories: submitCategories,
    });
  };

  return (
    <Flex as="article" direction="column">
      <Flex align={'center'} gap={spacer['spacing2.5']}>
        <Input
          {...register({ id: 'category-form' })}
          type="text"
          kind={'outline'}
          placeholder="카테고리를 입력하세요"
          onKeyDown={handleInputEnter}
          etcStyles={{
            flex: 1,
          }}
        />
        <Center
          as="button"
          etcStyles={{
            cursor: 'pointer',
          }}
          onClick={removeAllCategories}
        >
          <RefreshIcon width={16} height={16} fill={'#6C757D'} />
        </Center>
      </Flex>
      <Spacer direction="vertical" space={spacer['spacing2.5']} />
      <div
        css={css({
          width: '100%',
          minHeight: '120px',
          maxHeight: '300px',
        })}
      >
        <Flex
          as="ul"
          etcStyles={{
            gap: '4px',
            maxHeight: '300px',
            flexWrap: 'wrap',
            overflow: 'auto',
          }}
        >
          {categories.map((category) => {
            return (
              <Tag
                {...register({ id: category.id, name: 'category-tag' })}
                key={category.id}
                text={category.text}
                externalAction={() => removeCategory(category.id)}
              />
            );
          })}
        </Flex>
      </div>
      <ErrorMessage message={errorMessage} />
      <OpenClassifyBookmarkForm
        disabled={isDisabled}
        externalAction={handleSubmitClassifyFolder}
        etcStyles={{
          width: '100%',
        }}
      >
        <ModalLayer.Closer
          modalType="sidebar-panel"
          disabled={isDisabled}
          etcStyles={{
            width: '100%',
            marginTop: '12px',
          }}
        >
          <Button
            disabled={isDisabled}
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
