import { useCallback } from 'react';
import { css, type CSSObject } from '@emotion/react';

import { color } from '@/v3/shared/styles';
import { Flex } from 'bookmark-finder-extension-ui';

import { useEditFolderField } from '@/v3/entities/bookmark/edit/useEditFolderField';

import type { IFolder } from '@/v3/entities/bookmark/types/bookmark';

interface IBookmarkFolderFieldProps {
  folder: IFolder;
}

function BookmarkFolderField({ folder }: IBookmarkFolderFieldProps) {
  const { folderName, onChangeFolderTitle, finishEdit } = useEditFolderField({
    folder,
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFolderTitle(e.target.value);
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
      <input
        ref={inputRef}
        type="text"
        value={folderName}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        css={css({
          ...getFieldStyle(),
        })}
        placeholder="New Folder"
      />
    </Flex>
  );
}

export default BookmarkFolderField;

function getFieldWrapperStyle(): CSSObject {
  return {
    width: '100%',
    height: '100%',
    padding: '4px 8px',
    background: color.slate['200'],
    borderRadius: '2px',
    border: `2px solid ${color.slate['200']}`,
  };
}

function getFieldStyle(): CSSObject {
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
      fontSize: '12px',
    },
    '&:focus': {
      border: `2px solid ${color.primary}`,
    },
  };
}
