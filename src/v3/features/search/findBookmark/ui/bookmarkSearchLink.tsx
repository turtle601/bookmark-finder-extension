import { css } from '@emotion/react';

import { ISearchBookmarkLink } from '@/v3/background/bookmark/search';

interface ISearchBookmarkLinkProps {
  bookmark: ISearchBookmarkLink;
}

function BookmarkLink({ bookmark }: ISearchBookmarkLinkProps) {
  const openChromeLink = () => {
    chrome.tabs.create({ url: bookmark.url });
  };

  return (
    <div
      css={css({
        padding: '8px 12px',
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
      onClick={openChromeLink}
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

export default BookmarkLink;
