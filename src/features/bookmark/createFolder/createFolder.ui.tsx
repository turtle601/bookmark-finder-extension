import React from 'react';

import { spacer } from '@/shared/config/styles';

import Flex from '@/shared/ui/flex';
import Button from '@/shared/ui/button';
import Spacer from '@/shared/ui/spacer';
import ModalLayer from '@/shared/ui/modalLayer';
import { ErrorMessage, Input } from '@/shared/ui/input';

import { useForm } from '@/shared/hooks/useForm';
import { useCreateBookmarkMutation } from '@/entities/bookmark';

import type { FormRefValueType } from '@/shared/hooks/useForm';

interface ICreateFolder {
  parentId: string;
}

const CreateFolder: React.FC<ICreateFolder> = ({ parentId }) => {
  const { errorMessage, register, handleOnSubmit } = useForm();

  const { mutate: createBookmark } = useCreateBookmarkMutation();

  const submitFolder: React.FormEventHandler = (e) => {
    e.preventDefault();

    const action = (formRefValue: FormRefValueType) => {
      createBookmark({
        title: formRefValue['create-folder'].element.value,
        parentId,
      });
    };

    handleOnSubmit({
      action,
    });
  };

  return (
    <>
      <form onSubmit={submitFolder}>
        <Spacer direction="vertical" space={spacer.spacing2} />
        <Input
          {...register({
            id: 'create-folder',
          })}
          kind="outline"
          placeholder="폴더의 이름을 작성해주세요."
          etcStyles={{
            width: '100%',
          }}
        />
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
          onClick={submitFolder}
          etcStyles={{
            width: '100%',
            padding: '12px',
          }}
        >
          새 폴더 만들기
        </Button>
      </ModalLayer.Closer>
    </>
  );
};

export default CreateFolder;
