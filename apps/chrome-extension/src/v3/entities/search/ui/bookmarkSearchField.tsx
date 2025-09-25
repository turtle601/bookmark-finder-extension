import { css, CSSObject } from '@emotion/react';

import { Flex } from 'bookmark-finder-extension-ui';

interface IBookmarkSearchFieldProps {
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function BookmarkSearchField({
  inputRef,
  onChange,
}: IBookmarkSearchFieldProps) {
  return (
    <Flex align="center" css={css(getBookmarkSearchFieldWrapperStyle())}>
      <input
        ref={inputRef}
        type="text"
        onChange={onChange}
        placeholder="Search for bookmarks..."
        css={css(getBookmarkSearchFieldStyle())}
      />
      <span css={css(getBookmarkSearchFieldIconStyle())}>🔍</span>
    </Flex>
  );
}

export default BookmarkSearchField;

function getBookmarkSearchFieldWrapperStyle(): CSSObject {
  return {
    position: 'relative',
    width: '100%',
    height: '50px',
  };
}

function getBookmarkSearchFieldStyle(): CSSObject {
  return {
    width: '100%',
    height: '32px',
    padding: '8px 12px 8px 32px',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '10px',
    outline: 'none',
    transition: 'all 0.3s ease',
    background: '#ffffff',
    fontWeight: '400',
    color: '#1e293b',
    '&:focus': {
      borderColor: '#3b82f6',
      background: '#ffffff',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
    '&::placeholder': {
      color: '#64748b',
      fontSize: '10px',
    },
  };
}

function getBookmarkSearchFieldIconStyle(): CSSObject {
  return {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#64748b',
    fontSize: '16px',
  };
}
