import React from 'react';
import { css } from '@emotion/react';

import UpdateIcon from '@/shared/config/assets/update.svg';

import Flex from '@/shared/ui/flex';
import Text from '@/shared/ui/text';
import Center from '@/shared/ui/center';
import Spacer from '@/shared/ui/spacer';
import DnD from '@/shared/ui/dnd';
import { OpenUpdateLinkForm } from '@/app/modal-router';

import { color, spacer } from '@/shared/config/styles';
import { getFaviconkitIcon } from '@/shared/lib/icon';

import { DND_BOOKMARK_KEY } from '@/shared/config/constant';

import type { Bookmark } from '@/entities/bookmark';

interface IBookmarkLinkProps {
  bookmark: Bookmark;
}

export const BookmarkLink: React.FC<IBookmarkLinkProps> = ({ bookmark }) => {
  const handleNavigation = () => {
    if (bookmark.url) {
      window.location.href = bookmark.url;
    }
  };

  const handleDrag: React.DragEventHandler = (e) => {
    e.dataTransfer.setData(
      DND_BOOKMARK_KEY,
      JSON.stringify({
        type: 'link',
        id: bookmark.id,
      }),
    );
  };

  const handleOpenUpdateLinkForm = (e?: React.MouseEvent) => {
    e?.stopPropagation();
  };

  return (
    <DnD.Draggable
      dragAction={handleDrag}
      etcStyles={{
        width: '100%',
      }}
    >
      {({ isDrag }) => {
        return (
          <li
            css={css({
              width: '100%',
              backgroundColor: isDrag ? color.gray100 : color.white,
            })}
            onClick={handleNavigation}
          >
            <Flex
              align={'center'}
              etcStyles={{
                width: '100%',
              }}
            >
              <Center
                css={css({
                  width: `24px`,
                  height: `32px`,
                  backgroundColor: isDrag ? color.gray100 : color.white,
                  flex: 'none',
                })}
              >
                <img
                  width={`16px`}
                  height={`16px`}
                  src={getFaviconkitIcon(bookmark.url as string, 16)}
                  alt={`${bookmark.title}'s icon`}
                />
              </Center>
              <Spacer direction="horizontal" space={spacer.spacing2} />
              <Text type="sm" label={bookmark.title} />
              <Flex
                align={'center'}
                etcStyles={{
                  marginLeft: 'auto',
                  marginRight: '4px',
                }}
              >
                <OpenUpdateLinkForm
                  bookmark={bookmark}
                  externalAction={handleOpenUpdateLinkForm}
                >
                  <Center
                    etcStyles={{
                      width: '24px',
                      height: '24px',
                    }}
                  >
                    <UpdateIcon />
                  </Center>
                </OpenUpdateLinkForm>
              </Flex>
            </Flex>
          </li>
        );
      }}
    </DnD.Draggable>
  );
};
