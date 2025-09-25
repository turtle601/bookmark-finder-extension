import { DnD, Flex } from 'bookmark-finder-extension-ui';
import { useDragContent } from '../../entities/bookmark/dragContent/useDragContent';
import { useDOMRect } from '@/v3/shared/hooks/useDomRect';
import { CSSObject } from '@emotion/react';
import { color } from '@/v3/shared/styles';

function EditPointerContent() {
  const { domRef, rect } = useDOMRect<HTMLDivElement>();
  const { contentText } = useDragContent((rect?.width ?? 0) > 180);

  if (!contentText) {
    return <DnD.PointerContent />;
  }

  return (
    <DnD.PointerContent
      customContent={
        <Flex
          align="center"
          ref={domRef}
          etcStyles={getPointerContentWrapperStyle()}
        >
          <span css={getPointerContentTextStyle()}>{contentText}</span>
        </Flex>
      }
    />
  );
}

export default EditPointerContent;

function getPointerContentWrapperStyle(): CSSObject {
  return {
    width: '100%',
    minWidth: '60px',
    height: '100%',
    padding: '8px 12px',
    background: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    color: color.slate['600'],
    boxShadow: 'none',
  };
}

function getPointerContentTextStyle(): CSSObject {
  return {
    fontSize: '12px',
    fontWeight: '500',
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };
}
