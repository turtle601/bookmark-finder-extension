import React, { useRef, useState } from 'react';
import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';

import { createChromeRequest } from '@/shared/lib/fetch';
import Toggle from '@/shared/ui/toggle';
import { IAIBookmarkLink, IBookmarkLink } from '@background/bookmark';

interface ISearchProps {
  inputRef: React.RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Search({ inputRef, onChange }: ISearchProps) {
  return (
    <div
      css={css({
        position: 'relative',
      })}
    >
      <input
        ref={inputRef}
        onChange={onChange}
        css={css({
          width: '100%',
          padding: '12px 16px 12px 40px',
          border: '2px solid #e2e8f0',
          borderRadius: '10px',
          fontSize: '14px',
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
          },
        })}
        type="text"
        placeholder="북마크를 검색하세요..."
      />
      <span
        css={css({
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#64748b',
          fontSize: '16px',
        })}
      >
        🔍
      </span>
    </div>
  );
}

interface ISearchResultProps {
  bookmarks: IBookmarkLink[];
}

function BookmarkLink({ bookmark }: { bookmark: IBookmarkLink }) {
  return (
    <div
      css={css({
        padding: '10px 0',
        borderBottom: '1px solid #f1f5f9',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        borderRadius: '6px',
        '&:hover': {
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderBottom: '1px solid transparent',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        },
      })}
    >
      <div
        css={css({
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '4px',
        })}
      >
        <div
          css={css({
            width: '16px',
            height: '16px',
            borderRadius: '3px',
            fontSize: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <img
            src={bookmark.faviconUrl}
            alt="favicon"
            css={css({
              width: '100%',
              height: '100%',
            })}
          />
        </div>
        <div
          css={css({
            fontSize: '13px',
            fontWeight: '500',
            color: '#1e293b',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            lineHeight: '1.4',
          })}
        >
          {bookmark.title}
        </div>
      </div>
      <div
        css={css({
          fontSize: '11px',
          color: '#64748b',
          marginLeft: '24px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          marginBottom: '3px',
        })}
      >
        {bookmark.url}
      </div>
    </div>
  );
}

function SearchResult({ bookmarks }: ISearchResultProps) {
  if (bookmarks.length === 0) return <div>검색 결과가 없습니다.</div>;

  return (
    <div
      css={css({
        width: '100%',
        height: '200px',
        maxHeight: '200px',
        overflowY: 'auto',
      })}
    >
      {bookmarks.map((bookmark) => (
        <BookmarkLink key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}

function CheckAI({
  isChecked,
  onClick,
}: {
  isChecked: boolean;
  onClick: () => void;
}) {
  return (
    <div
      css={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 14px',
        background: 'rgba(59, 130, 246, 0.05)',
        borderRadius: '8px',
        border: '1px solid rgba(59, 130, 246, 0.1)',
      })}
    >
      <div
        css={css({
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          fontSize: '12px',
          color: '#475569',
          fontWeight: '500',
        })}
      >
        <span>🤖</span>
        <span>AI 스마트 검색</span>
      </div>
      <Toggle size="sm" isChecked={isChecked} onClick={onClick} />
    </div>
  );
}

function SearchSection() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [isAI, setIsAI] = useState(false);

  const searchQuery = async (payload: {
    text: string;
  }): Promise<IBookmarkLink[]> => {
    const response = await createChromeRequest<{
      isSuccess: boolean;
      data: IBookmarkLink[];
    }>({
      action: 'searchBookmarks',
      payload: { ...payload },
    });

    return response.data;
  };

  const searchAIQuery = async (payload: {
    text: string;
  }): Promise<IAIBookmarkLink[]> => {
    const response = await createChromeRequest<{
      isSuccess: boolean;
      data: IAIBookmarkLink[];
    }>({
      action: 'searchAIBookmarks',
      payload: { ...payload },
    });

    return response.data;
  };

  const isSearchBookmarkEnabled = debouncedSearchText !== '' && !isAI;
  const isSearchAIBookmarkEnabled = debouncedSearchText !== '' && isAI;

  const { data: bookmarks } = useQuery({
    queryKey: ['searchAllBookmarks', debouncedSearchText],
    queryFn: () => searchQuery({ text: debouncedSearchText }),
    enabled: isSearchBookmarkEnabled,
  });

  const { data: aiBookmarks } = useQuery({
    queryKey: ['searchAIBookmarks', debouncedSearchText],
    queryFn: () => searchAIQuery({ text: debouncedSearchText }),
    enabled: isSearchAIBookmarkEnabled,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebouncedSearchText(e.target.value);
  };

  return (
    <div>
      <Search inputRef={inputRef} onChange={handleChange} />
      <div
        css={css({
          marginTop: '12px',
        })}
      >
        <CheckAI
          isChecked={isAI}
          onClick={() => {
            setIsAI(!isAI);
          }}
        />
      </div>
      {isSearchBookmarkEnabled && <SearchResult bookmarks={bookmarks ?? []} />}
      {isSearchAIBookmarkEnabled && (
        <SearchResult bookmarks={aiBookmarks ?? []} />
      )}
    </div>
  );
}

export default SearchSection;
