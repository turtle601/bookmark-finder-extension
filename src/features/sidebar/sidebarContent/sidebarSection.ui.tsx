import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { css } from '@emotion/react';
import { spacer } from '@/shared/config/styles';

import Button from '@/shared/ui/button';
import Spacer from '@/shared/ui/spacer';
import ModalLayer from '@/shared/ui/modalLayer';
import CategoryForm from '@/features/autoCategorization/categoryForm';
import SidebarFormWrapper from '@/features/sidebar/sidebarContent/sidebarFormWrapper.ui';
import BookmarksAccordian from '@/features/bookmark/boomarksAccordian';

import { bookmarkService } from '@/entities/bookmark';

const SidebarSection: React.FC = () => {
  const { data: bookmarks } = useSuspenseQuery({
    ...bookmarkService.queryOptions(),
  });

  return (
    <div
      css={css({
        width: '100%',
        padding: spacer.spacing3,
      })}
    >
      <ModalLayer.Opener
        modalType="sidebar-form"
        modalContent={
          <SidebarFormWrapper>
            <CategoryForm />
          </SidebarFormWrapper>
        }
        etcStyles={{
          width: '100%',
        }}
      >
        <Button
          kind="default"
          etcStyles={{
            width: '100%',
            padding: spacer.spacing3,
          }}
        >
          AI로 북마크 자동 분류
        </Button>
      </ModalLayer.Opener>
      <Spacer direction="vertical" space={spacer.spacing4} />
      <div
        css={css({
          width: '100%',
          height: 'calc(100vh - 100px - 48px - 32px - 100px)',
          overflow: 'auto',
        })}
      >
        <BookmarksAccordian bookmarks={bookmarks} />
      </div>
    </div>
  );
};

export default SidebarSection;
