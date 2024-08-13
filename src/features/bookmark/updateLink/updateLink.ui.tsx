import React, { useRef } from 'react';

import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import Spacer from '@/shared/ui/spacer';
import ModalLayer from '@/shared/ui/modalLayer';

import { color, spacer } from '@/shared/config/styles';

import { useUpdateBookmarkMutation } from '@/entities/bookmark';

interface IUpdateLink {
  id: string;
  parentId: string;
  url: string;
  title: string;
}

const UpdateLink: React.FC<IUpdateLink> = ({ id, parentId, url, title }) => {
  const inputRefList = useRef<(HTMLInputElement | null)[]>([]);

  const { mutate: updateLink } = useUpdateBookmarkMutation();

  const submitUpdateLink: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (inputRefList.current[0] && inputRefList.current[1]) {
      updateLink({
        id,
        parentId,
        title: inputRefList.current[0]?.value,
        url: inputRefList.current[1]?.value,
      });
    }
  };

  return (
    <>
      <Spacer direction="vertical" space={spacer.spacing3} />
      <form onSubmit={submitUpdateLink}>
        <Input
          inputName="update-link-title"
          inputValue={title}
          validate={(value) => value.length === 0}
        >
          <Input.Field
            ref={(el) => (inputRefList.current[0] = el)}
            kind={'outline'}
            placeholder="링크 제목"
            paddingLeft={'8px'}
            etcStyles={{
              width: '100%',
              padding: '8px',
              color: color.gray,
            }}
          />
        </Input>
        <Spacer direction="vertical" space={spacer.spacing3} />
        <Input inputName="update-link-url" inputValue={url}>
          <Input.Field
            ref={(el) => (inputRefList.current[1] = el)}
            kind={'outline'}
            placeholder="링크 URL"
            paddingLeft={'8px'}
            etcStyles={{
              width: '100%',
              padding: '8px',
              color: color.gray,
            }}
          />
        </Input>
      </form>
      <Spacer direction="vertical" space={spacer.spacing3} />
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
