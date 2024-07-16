import { FormEventHandler, useRef } from 'react';

import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';

import { useCreateBookmarkMutation } from '@/entities/bookmark';

interface ICreateFolder {
  parentId: string;
}

const CreateFolder = ({ parentId }: ICreateFolder) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: createBookmark } = useCreateBookmarkMutation();

  const submitFolder: FormEventHandler = (e) => {
    e.preventDefault();

    if (inputRef.current && !inputRef.current.checkValidity()) {
      createBookmark({ title: inputRef.current.value, parentId });
    }
  };

  return (
    <form onSubmit={submitFolder}>
      <Input
        inputName="createBookmark"
        inputValue=""
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
        폴더 만들기
      </Button>
    </form>
  );
};

export default CreateFolder;
