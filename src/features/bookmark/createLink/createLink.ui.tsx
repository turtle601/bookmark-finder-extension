import React, { useRef } from 'react';

import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import Spacer from '@/shared/ui/spacer';
import ModalLayer from '@/shared/ui/modalLayer';

import { color, spacer } from '@/shared/config/styles';

import { useCreateBookmarkMutation } from '@/entities/bookmark';

interface ICreateLinkProps {
  parentId: string;
}

const CreateLink: React.FC<ICreateLinkProps> = ({ parentId }) => {
  const inputRefList = useRef<(HTMLInputElement | null)[]>([]);

  const { mutate: createBookmark } = useCreateBookmarkMutation();

  const submitNewLink: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (inputRefList.current[0] && inputRefList.current[1]) {
      createBookmark({
        title: inputRefList.current[0]?.value,
        url: inputRefList.current[1]?.value,
        parentId,
      });
    }
  };

  return (
    <>
      <form onSubmit={submitNewLink}>
        <Spacer direction="vertical" space={spacer.spacing2} />
        <Input inputName="create-link-titile" inputValue="">
          <Input.Field
            ref={(el) => (inputRefList.current[0] = el)}
            kind={'outline'}
            placeholder="링크의 제목을 지어주세요"
            paddingLeft={'8px'}
            etcStyles={{
              width: '100%',
              padding: '8px',
              color: color.gray,
            }}
          />
        </Input>
        <Spacer direction="vertical" space={spacer.spacing3} />
        <Input inputName="create-link-url" inputValue="">
          <Input.Field
            ref={(el) => (inputRefList.current[1] = el)}
            kind={'outline'}
            placeholder="링크를 입력해주세요"
            paddingLeft={'8px'}
            etcStyles={{
              width: '100%',
              padding: '8px',
              color: color.gray,
            }}
          />
        </Input>
        <Spacer direction="vertical" space={spacer.spacing3} />
      </form>
      <ModalLayer.Closer modalType="sidebar-form" etcStyles={{ width: '100%' }}>
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
