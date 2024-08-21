import React, { useEffect } from 'react';

import Button from '@/shared/ui/button';

import Spacer from '@/shared/ui/spacer';
import ModalLayer from '@/shared/ui/modalLayer';
import { ErrorMessage, Input } from '@/shared/ui/input';

import { spacer } from '@/shared/config/styles';

import { useUpdateBookmarkMutation } from '@/entities/bookmark';
import { getOutlineFieldStyle } from '@/shared/ui/input/input.style';
import { FormRefValueType, useForm } from '@/shared/hooks/useForm';
import Flex from '@/shared/ui/flex';

interface IUpdateLink {
  id: string;
  parentId: string;
  url: string;
  title: string;
}

const UpdateLink: React.FC<IUpdateLink> = ({ id, parentId, url, title }) => {
  const { errorMessage, register, handleOnSubmit, watch } = useForm();

  const { mutate: updateLink } = useUpdateBookmarkMutation();

  const submitUpdateLink: React.FormEventHandler = (e) => {
    e.preventDefault();

    const action = (formRefValue: FormRefValueType) => {
      updateLink({
        id,
        parentId,
        title: formRefValue['update-link-title'].element.value,
        url: formRefValue['update-link-url'].element.value,
      });
    };

    handleOnSubmit({
      action,
    });
  };

  useEffect(() => {
    watch({ id: 'update-link-title' }).element.value = title;
    watch({ id: 'update-link-url' }).element.value = url;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Spacer direction="vertical" space={spacer.spacing2} />
      <form onSubmit={submitUpdateLink}>
        <Input
          placeholder="링크 제목을 지어주세요"
          {...register({
            id: 'update-link-title',
            customValidate: {
              fn: (el) => {
                return el.value.length > 0;
              },
              errorMessage: '링크 제목을 한 글자 이상 입력해주세요',
            },
          })}
          etcStyles={{
            width: '100%',
            ...getOutlineFieldStyle(),
          }}
        />
        <Spacer direction="vertical" space={spacer.spacing3} />
        <Input
          placeholder="링크 URL을 입력해주세요"
          {...register({
            id: 'update-link-url',
            customValidate: {
              fn: (el) => {
                return el.value.length > 0;
              },
              errorMessage: '링크 URL을 한 글자 이상 입력해주세요',
            },
          })}
          etcStyles={{
            width: '100%',
            ...getOutlineFieldStyle(),
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
          onClick={submitUpdateLink}
          etcStyles={{
            width: '100%',
            padding: '12px',
          }}
        >
          링크 수정하기
        </Button>
      </ModalLayer.Closer>
    </>
  );
};

export default UpdateLink;
