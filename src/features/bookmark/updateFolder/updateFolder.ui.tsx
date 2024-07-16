import { FormEventHandler, useRef } from 'react';

import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';

import { useUpdateBookmarkMutation } from '@/entities/bookmark';

interface IUpdateFolder {
  id: string;
  parentId: string;
  title: string;
}

const UpdateFolder = ({ id, parentId, title }: IUpdateFolder) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: updateFolder } = useUpdateBookmarkMutation();

  const submitFolder: FormEventHandler = (e) => {
    e.preventDefault();

    if (inputRef.current && !inputRef.current.checkValidity()) {
      updateFolder({ title: inputRef.current.value, parentId, id });
    }
  };

  return (
    <form onSubmit={submitFolder}>
      <Input
        inputName="updateFolder"
        inputValue={title}
        validate={(value) => value.length === 0}
      >
        <Input.Field
          ref={inputRef}
          kind={'outline'}
          placeholder="폴더의 이름을 입력해주세요"
          etcStyles={{
            width: '100%',
          }}
        />
        <Input.ErrorMessage message="폴더 이름을 최대 한 글자 이상 입력해주세요" />
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

export default UpdateFolder;
