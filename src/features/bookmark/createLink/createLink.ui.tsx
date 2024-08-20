import React from 'react';

import Flex from '@/shared/ui/flex';
import Button from '@/shared/ui/button';
import Spacer from '@/shared/ui/spacer';
import ModalLayer from '@/shared/ui/modalLayer';
import { ErrorMessage, Input } from '@/shared/ui/input';

import { spacer } from '@/shared/config/styles';
import { getOutlineFieldStyle } from '@/shared/ui/input/input.style';

import { useForm } from '@/shared/hooks/useForm';
import { useCreateBookmarkMutation } from '@/entities/bookmark';

import type { FormRefValueType } from '@/shared/hooks/useForm';

interface ICreateLinkProps {
  parentId: string;
}

const CreateLink: React.FC<ICreateLinkProps> = ({ parentId }) => {
  const { errorMessage, register, handleOnSubmit } = useForm();

  const { mutate: createBookmark } = useCreateBookmarkMutation();

  const submitNewLink: React.FormEventHandler = (e) => {
    e.preventDefault();

    const action = (formRefValue: FormRefValueType) => {
      createBookmark({
        title: formRefValue['create-link-title'].element.value,
        url: formRefValue['create-link-url'].element.value,
        parentId,
      });
    };

    handleOnSubmit({
      action,
    });
  };

  return (
    <>
      <form onSubmit={submitNewLink}>
        <Spacer direction="vertical" space={spacer.spacing2} />
        <Input
          placeholder="링크 제목을 지어주세요"
          {...register({
            id: 'create-link-title',
            customValidate: {
              fn: (el) => {
                return el.value.length > 0;
              },
              errorMessage: '링크 제목을 한 글자 이상 입력해주세요',
            },
          })}
          etcStyles={{
            ...getOutlineFieldStyle(),
            width: '100%',
          }}
        />
        <Spacer direction="vertical" space={spacer.spacing3} />
        <Input
          placeholder="링크 URL을 입력해주세요"
          {...register({
            id: 'create-link-url',
            customValidate: {
              fn: (el) => {
                return el.value.length > 0;
              },
              errorMessage: '링크 URL을 한 글자 이상 입력해주세요',
            },
          })}
          etcStyles={{
            ...getOutlineFieldStyle(),
            width: '100%',
          }}
        />
        <Spacer direction="vertical" space={spacer.spacing3} />
      </form>
      <Flex
        align={'center'}
        etcStyles={{
          height: '36px',
        }}
      >
        <ErrorMessage message={errorMessage} />
      </Flex>
      <ModalLayer.Closer
        modalType="sidebar-panel"
        etcStyles={{ width: '100%' }}
      >
        <Button
          kind="default"
          type="submit"
          onClick={submitNewLink}
          etcStyles={{
            width: '100%',
            padding: '12px',
          }}
        >
          새 링크 만들기
        </Button>
      </ModalLayer.Closer>
    </>
  );
};

export default CreateLink;
