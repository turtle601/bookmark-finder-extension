import { color } from '@/v3/shared/styles';
import { css } from '@emotion/react';

interface IBookmarkDropAreaProps {
  isDragEnter: boolean;
}

function BookmarkDropArea({ isDragEnter }: IBookmarkDropAreaProps) {
  if (isDragEnter) {
    return (
      <div
        css={css({
          width: '100%',
          height: '34px',
          border: `2px solid ${color.slate['300']}`,
          borderStyle: 'dashed',
          borderRadius: '4px',
        })}
      ></div>
    );
  }

  return (
    <div
      css={css({
        width: '100%',
        height: '4px',
        backgroundColor: 'transparent',
        borderRadius: '4px',
      })}
    ></div>
  );
}

export default BookmarkDropArea;
