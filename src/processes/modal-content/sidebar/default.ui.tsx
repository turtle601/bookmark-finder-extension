import React, { Suspense } from 'react';
import { css } from '@emotion/react';

import { color, spacer } from '@/shared/config/styles';

import SearchButtonIcon from '@/shared/config/assets/search-button.svg';

import DnD from '@/shared/ui/dnd';
import Button from '@/shared/ui/button';
import Spacer from '@/shared/ui/spacer';
import Accordion from '@/shared/ui/accordion';

import DeleteBookmarkButton from '@/features/bookmark/deleteBookmarkButton';
import BookmarkAccordian from '@/features/bookmark/bookmarkAccordian';

import SidebarWidget from '@/widget/sidebar';
import ModalLayer from '@/shared/ui/modalLayer';
import OpenSearchModal from '@/app/modal-router/openSearchModal.ui';
import OpenCreateFolderCategoryForm from '@/app/modal-router/openCreateFolderCategoryForm.ui';
import Spinner from '@/shared/ui/spinner';
import Center from '@/shared/ui/center';

export type SidebarDefaultFC = React.FC;

const Default: SidebarDefaultFC = () => {
  return (
    <SidebarWidget.Wrapper>
      <DnD.Provider>
        <DnD.Boundary width={'360px'} height={'100vh'}>
          <DnD.PointerContent
            customStyle={() => {
              return {
                maxWidth: '240px',
                minWidth: '200px',
                border: `1px solid ${color.gray300}`,
                boxShadow: `0px 3px 4px rgba(116, 116, 116, 0.3)`,
              };
            }}
          />
          <SidebarWidget.Header>
            <ModalLayer.Closer modalType="sidebar-panel">
              <OpenSearchModal>
                <SearchButtonIcon />
              </OpenSearchModal>
            </ModalLayer.Closer>
          </SidebarWidget.Header>
          <div
            css={css({
              padding: spacer.spacing3,
            })}
          >
            <OpenCreateFolderCategoryForm etcStyles={{ width: '100%' }}>
              <Button
                kind="default"
                etcStyles={{
                  width: '100%',
                  padding: spacer.spacing3,
                }}
              >
                AI로 북마크 자동 분류
              </Button>
            </OpenCreateFolderCategoryForm>
            <Spacer direction="vertical" space={spacer.spacing4} />
            <Suspense
              fallback={
                <Center
                  etcStyles={{
                    width: '100%',
                    height: 'calc(100vh - 280px)',
                  }}
                >
                  <Spinner />
                </Center>
              }
            >
              <Accordion.Provider>
                <BookmarkAccordian />
              </Accordion.Provider>
            </Suspense>
            <div
              css={css({
                width: '100%',
                height: '80px',
                padding: spacer.spacing3,
              })}
            >
              <DeleteBookmarkButton />
            </div>
          </div>
        </DnD.Boundary>
      </DnD.Provider>
    </SidebarWidget.Wrapper>
  );
};

export default Default;
