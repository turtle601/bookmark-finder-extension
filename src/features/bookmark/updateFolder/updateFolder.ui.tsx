import React, { useEffect } from 'react';

import { spacer } from '@/shared/config/styles';

import Flex from '@/shared/ui/flex';
import Button from '@/shared/ui/button';
import Spacer from '@/shared/ui/spacer';
import ModalLayer from '@/shared/ui/modalLayer';
import { ErrorMessage, Input } from '@/shared/ui/input';

import { useForm } from '@/shared/hooks/useForm';
import { getOutlineFieldStyle } from '@/shared/ui/input/input.style';

import { useUpdateBookmarkMutation } from '@/entities/bookmark';

import type { FormRefValueType } from '@/shared/hooks/useForm';

interface IUpdateFolder {
  id: string;
  parentId: string;
  title: string;
}

const UpdateFolder: React.FC<IUpdateFolder> = ({ id, parentId, title }) => {
  const { errorMessage, register, handleOnSubmit, watch } = useForm();

  const { mutate: updateFolder } = useUpdateBookmarkMutation();

  const submitFolder: React.FormEventHandler = (e) => {
    e.preventDefault();

    const action = (formRefValue: FormRefValueType) => {
      updateFolder({
        id,
        title: formRefValue['update-folder'].element.value,
        parentId,
      });
    };

    handleOnSubmit({
      action,
    });
  };

  useEffect(() => {
    watch({ id: 'update-folder' }).element.value = title;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Spacer direction="vertical" space={spacer.spacing3} />
      <form onSubmit={submitFolder}>
        <Input
          {...register({
            id: 'update-folder',
            customValidate: {
              fn: (el) => {
                return el.value.length > 0;
              },
              errorMessage: '폴더 이름을 한 글자 이상 입력해주세요',
            },
          })}
          defaultValue={title}
          placeholder="폴더의 이름을 작성해주세요."
          etcStyles={{
            ...getOutlineFieldStyle(),
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
          폴더 수정하기
        </Button>
      </ModalLayer.Closer>
    </>
  );
};

export default UpdateFolder;
