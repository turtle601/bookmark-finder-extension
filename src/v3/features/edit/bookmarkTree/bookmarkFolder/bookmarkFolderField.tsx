import { css, type CSSObject } from '@emotion/react';
import { useCallback, useState } from 'react';

import { color } from '@/v3/shared/styles';
import Flex from '@/v3/shared/ui/layout/flex';

import { useUpdateBookmarkTitleMutation } from '@/v3/entities/bookmark/tree/request/queries';

import { useEditBookmarkStore } from '@/v3/features/edit/store/useEditBookmarkStore';

import type { IBookmarkTreeStorage } from '@/v3/background/bookmark/@storage';

const getFieldWrapperStyle = (): CSSObject => {
  return {
    width: '100%',
    height: '100%',
    padding: '4px 8px',
    background: color.slate['200'],
    borderRadius: '2px',
    border: `2px solid ${color.slate['200']}`,
  };
};

const getFieldStyle = (): CSSObject => {
  return {
    flex: 1,
    width: '100%',
    height: '100%',
    outline: 'none',
    background: 'white',
    fontSize: '12px',
    color: color.slate['900'],
    border: `2px solid ${color.slate['200']}`,
    '&::placeholder': {
      color: color.slate['500'],
    },
    '&:focus': {
      border: `2px solid ${color.primary}`,
    },
  };
};

function FieldIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

interface IBookmarkFolderFieldProps {
  folder: IBookmarkTreeStorage;
}

function BookmarkFolderField({ folder }: IBookmarkFolderFieldProps) {
  const [folderName, setFolderName] = useState(folder.title);
  const { setEditBookmark } = useEditBookmarkStore();

  const { mutate: updateBookmarkTitle } = useUpdateBookmarkTitleMutation();

  const inputRef = useCallback((el: HTMLInputElement) => {
    let timer: NodeJS.Timeout | null = null;

    if (el) {
      timer = setTimeout(() => {
        el.focus();
        el.select();
      }, 0);
    } else {
      if (timer) {
        clearTimeout(timer);
      }
    }
  }, []);

  const finishEdit = () => {
    setEditBookmark(null);

    updateBookmarkTitle({
      id: folder.id,
      title: folderName,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      finishEdit();
    }
  };

  const handleBlur = () => {
    finishEdit();
  };

  return (
    <Flex
      align="center"
      gap={'4px'}
      etcStyles={{
        ...getFieldWrapperStyle(),
      }}
    >
      <FieldIcon />
      <input
        ref={inputRef}
        type="text"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        css={css({
          ...getFieldStyle(),
        })}
        placeholder="새 폴더"
      />
    </Flex>
  );
}

export default BookmarkFolderField;
