import React from 'react';
import { css } from '@emotion/react';

import Spacer from '@/shared/ui/spacer';

import ClassifyBookmarkForm from '@/features/autoCategorization/classifyBookmarkForm';

import SidebarWidget from '@/widget/sidebar';

import { spacer } from '@/shared/config/styles';

export type ClassifiedBookmarkFormFC = React.FC;

const ClassifiedBookmarkForm: ClassifiedBookmarkFormFC = () => {
  return (
    <SidebarWidget.Wrapper>
      <SidebarWidget.Header />
      <div
        css={css({
          padding: spacer.spacing3,
        })}
      >
        <Spacer direction="vertical" space={spacer.spacing2} />
        <ClassifyBookmarkForm />
      </div>
    </SidebarWidget.Wrapper>
  );
};

export default ClassifiedBookmarkForm;
