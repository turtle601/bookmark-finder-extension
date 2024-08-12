import React, { FormEventHandler, useRef } from 'react';

import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import Spacer from '@/shared/ui/spacer';
import ModalLayer from '@/shared/ui/modalLayer';

import { color, spacer } from '@/shared/config/styles';

import { useCreateBookmarkMutation } from '@/entities/bookmark';

import type { Bookmark } from '@/entities/bookmark';

interface ICreateFolder {
  title: Bookmark['title'];
  parentId: string;
}

const CreateFolder: React.FC<ICreateFolder> = ({ title, parentId }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: createBookmark } = useCreateBookmarkMutation();

  const submitFolder: FormEventHandler = (e) => {
    e.preventDefault();

    if (inputRef.current && !inputRef.current.checkValidity()) {
      createBookmark({ title: inputRef.current.value, parentId });
    }
  };

  return (
    <>
      <form onSubmit={submitFolder}>
        <Spacer direction="vertical" space={spacer.spacing2} />
        <Input
          inputName="createBookmark"
          inputValue=""
          validate={(value) => value.length === 0}
        >
          <Input.Field
            ref={inputRef}
            kind={'outline'}
            placeholder={`${title} 폴더 내 새 폴더 생성하기`}
            paddingLeft={'8px'}
            etcStyles={{
              width: '100%',
              padding: '8px',
              color: color.gray,
            }}
          />
          <Input.ErrorMessage message="폴더 이름은 한 글자 이상 입력하세요" />
        </Input>
      </form>
      <ModalLayer.Closer modalType="sidebar-form" etcStyles={{ width: '100%' }}>
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
