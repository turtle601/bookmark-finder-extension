import React, { useRef } from 'react';

import LargeXIcon from '@/shared/config/assets/largeX.svg';

import Flex from '@/shared/ui/flex';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import Spacer from '@/shared/ui/spacer';
import ModalLayer from '@/shared/ui/modalLayer';

import { color, spacer } from '@/shared/config/styles';

import { useUpdateBookmarkMutation } from '@/entities/bookmark';
import Center from '@/shared/ui/center';

interface IUpdateFolder {
  id: string;
  parentId: string;
  title: string;
}

const UpdateFolder: React.FC<IUpdateFolder> = ({ id, parentId, title }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: updateFolder } = useUpdateBookmarkMutation();

  const submitFolder: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (inputRef.current && !inputRef.current.checkValidity()) {
      updateFolder({ title: inputRef.current.value, parentId, id });
    }
  };

  return (
    <>
      <form onSubmit={submitFolder}>
        <Input
          inputName="updateFolder"
          inputValue={title}
          validate={(value) => value.length === 0}
        >
          <Flex justify={'space-between'} align={'center'}>
            <Input.Label
              text={`${title} 폴더 수정하기`}
              etcStyles={{
                padding: '4px 12px',
                color: color.green,
                borderBottom: `1px solid ${color.green}`,
              }}
            />
            <ModalLayer.Closer modalType="sidebar-form">
              <Center etcStyles={{ width: '24px', height: '24px' }}>
                <LargeXIcon />
              </Center>
            </ModalLayer.Closer>
          </Flex>
          <Spacer direction="vertical" space={spacer.spacing2} />
          <Input.Field
            ref={inputRef}
            kind={'outline'}
            placeholder=""
            paddingLeft={'8px'}
            etcStyles={{
              width: '100%',
              padding: '8px',
              color: color.gray,
            }}
          />
          <Input.ErrorMessage message="폴더 이름을 최대 한 글자 이상 입력해주세요" />
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
          링크 수정하기
        </Button>
      </ModalLayer.Closer>
    </>
  );
};

export default UpdateFolder;
