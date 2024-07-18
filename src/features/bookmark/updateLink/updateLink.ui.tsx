import { FormEventHandler, useRef } from 'react';

import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';

import { useUpdateBookmarkMutation } from '@/entities/bookmark';

interface IUpdateLink {
  id: string;
  parentId: string;
  url: string;
  title: string;
}

const UpdateLink = ({ id, parentId, url, title }: IUpdateLink) => {
  const inputRefList = useRef<(HTMLInputElement | null)[]>([]);

  const { mutate: updateLink } = useUpdateBookmarkMutation();

  const submitFolder: FormEventHandler = (e) => {
    e.preventDefault();

    let flag = false;

    if (inputRefList.current[0] && inputRefList.current[0].checkValidity()) {
      flag = true;
      inputRefList.current[0].focus();
      return;
    }

    if (!flag && inputRefList.current[0] && inputRefList.current[1]) {
      updateLink({
        id,
        parentId,
        title: inputRefList.current[0]?.value,
        url: inputRefList.current[1]?.value,
      });
    }
  };

  return (
    <form onSubmit={submitFolder}>
      <Input
        inputName="update-link-title"
        inputValue={title}
        validate={(value) => value.length === 0}
      >
        <Input.Field
          ref={(el) => (inputRefList.current[0] = el)}
          kind={'outline'}
          placeholder="링크의 제목을 지어주세요"
          etcStyles={{
            width: '100%',
          }}
        />
        <Input.ErrorMessage message="폴더 이름을 최대 한 글자 이상 입력해주세요" />
      </Input>
      <Input inputName="update-link-url" inputValue={url}>
        <Input.Field
          ref={(el) => (inputRefList.current[1] = el)}
          kind={'outline'}
          placeholder="링크를 입력해주세요"
          etcStyles={{
            width: '100%',
          }}
        />
        <Input.ErrorMessage message="입력하신 텍스트가 URL이 맞는지 확인해주세요" />
      </Input>

      <Button
        kind="default"
        type="submit"
        etcStyles={{
          width: '100%',
          padding: '12px',
        }}
      >
        링크 수정하기
      </Button>
    </form>
  );
};

export default UpdateLink;
