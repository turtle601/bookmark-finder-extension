import type { Bookmark } from '@/entities/bookmark';
import type { ICategoryBookmark } from '@/entities/classify';

const makeNewBookmark = (
  parentId: '1' | '2',
  newBookmark: ICategoryBookmark[],
): Bookmark[] => {
  return newBookmark.map((categoryBookmark, idx) => {
    return {
      id: categoryBookmark.id,
      title: categoryBookmark.category,
      parentId: parentId,
      index: idx,
      children: categoryBookmark.bookmark.map((link, idx) => {
        return {
          ...link,
          parentId: categoryBookmark.id,
          index: idx,
        };
      }),
    };
  });
};

// 북마크바 폴더에 새로운 북마크 추가 (기존 북마크 파일 제거)
export const addBookmarkbar = (response: ICategoryBookmark[]): Bookmark[] => {
  return [
    {
      id: '1',
      parentId: '0',
      index: 0,
      title: '북마크바',
      children: makeNewBookmark('1', response),
    },
    {
      id: '2',
      parentId: '0',
      index: 1,
      title: '기타 북마크',
      children: [],
    },
  ];
};

// 기타 북마크 폴더에 새로운 북마크 추가 (기존 기타 북마크 폴더 파일 제거)
export const addEtcBookmarkbar = (
  response: ICategoryBookmark[],
): Bookmark[] => {
  return [
    {
      id: '1',
      parentId: '0',
      index: 0,
      title: '북마크바',
      children: [],
    },
    {
      id: '2',
      parentId: '0',
      index: 1,
      title: '기타 북마크',
      children: makeNewBookmark('2', response),
    },
  ];
};

// 기타 북마크에 새로운 북마크 추가 (기존 북마크 데이터 값 유지)
export const addEtcBookmarkToDefault = (
  prevBookmark: Bookmark[],
  response: ICategoryBookmark[],
) => {
  const rootBookmark = prevBookmark[0].children as Bookmark[];

  const newBookmarks = makeNewBookmark('2', response);

  const etcBookmarkChildren = rootBookmark[1].children
    ? [...rootBookmark[1].children, ...newBookmarks]
    : [...newBookmarks];

  const etcBookmark = {
    ...rootBookmark[1],
    children: etcBookmarkChildren,
  };

  return [rootBookmark[0], etcBookmark];
};

export const getClassifedBookmarkGuideText = (idx: number) => {
  const guideTextList = [
    '',
    '북마크바 폴더에 AI 북마크 추가 (기존 북마크 제거)',
    '기타 북마크 폴더에 AI 북마크 추가 (기존 북마크 제거)',
    '기타 북마크에 AI 북마크 추가 (기존 북마크 유지)',
  ];

  return guideTextList[idx];
};
