import { color } from '@/v3/shared/styles';
import { CSSObject } from '@emotion/react';

export function getBookmarkFolderWrapperStyle(
  isSelected: boolean = false,
): CSSObject {
  return {
    width: '100%',
    height: '100%',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    borderRadius: '4px',
    border: `1px solid ${isSelected ? color.primary : color.slate['100']}`,
    backgroundColor: color.slate['100'],
  };
}

export function getBookmarkFolderDragSectionStyle(
  isDragEnter: boolean,
  isDrag: boolean = false,
): CSSObject {
  return {
    borderRadius: '2px',
    padding: '4px 8px',
    border: isDrag
      ? isDragEnter
        ? `2px dashed ${color.slate['500']}`
        : `2px dashed ${color.primary}`
      : isDragEnter
        ? `2px dashed ${color.slate['500']}`
        : `2px dashed ${color.slate['200']}`,
    backgroundColor: isDrag ? '#3b82f6' : color.slate['200'],
    transition: 'all 0.2s ease',
    ...(!isDrag && {
      '&:hover': {
        '& [data-bookmark-edit-button]': {
          opacity: 1,
        },
      },
    }),
  };
}

export function getBookmarkFolderAccordionButtonStyle(): CSSObject {
  return {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: color.slate['900'],
    fontSize: '12px',
    lineHeight: '16px',
  };
}

export function getBookmarkFolderTextStyle(): CSSObject {
  return {
    fontSize: '12px',
    lineHeight: '16px',
  };
}

export function getBookmarkFolderDepthStyle(): CSSObject {
  return {
    paddingLeft: '20px',
  };
}
