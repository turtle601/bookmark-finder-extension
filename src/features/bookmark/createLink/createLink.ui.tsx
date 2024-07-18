import { FormEventHandler, useRef } from 'react';

import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';

import { useCreateBookmarkMutation } from '@/entities/bookmark';

interface ICreateLink {
  parentId: string;
}

const CreateLink = ({ parentId }: ICreateLink) => {
  const inputRefList = useRef<(HTMLInputElement | null)[]>([]);

  const { mutate: createBookmark } = useCreateBookmarkMutation();

  const submitFolder: FormEventHandler = (e) => {
    e.preventDefault();

    let flag = false;

    inputRefList.current.forEach((inputRef, i) => {
      if (inputRef?.checkValidity()) {
        flag = true;
        inputRef?.focus();
        return;
      }
    });

    if (!flag && inputRefList.current[0] && inputRefList.current[1]) {
      createBookmark({
        title: inputRefList.current[0]?.value,
        url: inputRefList.current[1]?.value,
        parentId,
      });
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
          ref={(el) => (inputRefList.current[0] = el)}
          kind={'outline'}
          placeholder="링크의 제목을 지어주세요"
          etcStyles={{
            width: '100%',
          }}
        />
        <Input.ErrorMessage message="폴더 이름을 최대 한 글자 이상 입력해주세요" />
      </Input>
      <Input
        inputName="createBookmark"
        inputValue=""
        validate={(value) => value.length === 0}
      >
        <Input.Field
          ref={(el) => (inputRefList.current[1] = el)}
          kind={'outline'}
          placeholder="링크를 입력해주세요"
          etcStyles={{
            width: '100%',
          }}
        />
        <Input.ErrorMessage message="링크 이름을 최대 한 글자 이상 입력해주세요" />
      </Input>

      <Button
        kind="default"
        type="submit"
        etcStyles={{
          width: '100%',
          padding: '12px',
        }}
      >
        새로운 링크 만들기
      </Button>
    </form>
  );
};

export default CreateLink;
