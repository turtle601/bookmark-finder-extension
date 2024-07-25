import React from 'react';

import { color, spacer } from '@/shared/config/styles';

import Flex from '@/shared/ui/flex';
import Text from '@/shared/ui/text';
import Button from '@/shared/ui/button';
import Checkbox from '@/shared/ui/checkbox';
import ModalLayer from '@/shared/ui/modalLayer';
import Accordion from '@/shared/ui/accordion';
import AccordianBookmark from '@/features/autoCategorization/classifiedBookmarkForm/accoridanBookmark.ui';

import { useClassifiedBookmarks } from '@/features/autoCategorization/classifiedBookmarkForm/hooks/useClassifiedBookmarks';

const ClassifiedBookmarkForm = () => {
  const {
    checkType,
    isCreatedLoading,
    classifiedBookmarks,
    toggleCheckType,
    handleCreateNewBookmark,
  } = useClassifiedBookmarks();

  return (
    <Flex
      direction={'column'}
      gap={spacer.spacing5}
      etcStyles={{
        opacity: isCreatedLoading ? 0.2 : 1,
        cursor: isCreatedLoading ? 'not-allowed' : 'pointer',
        pointerEvents: isCreatedLoading ? 'none' : 'all',
      }}
    >
      <Flex justify={'space-between'}>
        <ModalLayer.Opener modalType="sidebar" modalContent={<></>}>
          <Button
            kind="danger"
            etcStyles={{
              width: '112px',
              height: '60px',
            }}
          >
            <Text textColor={color.white} label={'취소'} />
          </Button>
        </ModalLayer.Opener>
        <ModalLayer.Opener
          modalType="sidebar"
          modalContent={<></>}
          externalAction={handleCreateNewBookmark}
        >
          <Button
            disabled={!checkType}
            kind={'valid'}
            etcStyles={{
              width: '112px',
              height: '60px',
            }}
          >
            <Text textColor={color.white} label={`${checkType} 수정`} />
          </Button>
        </ModalLayer.Opener>
      </Flex>
      <div>
        <>
          {classifiedBookmarks?.map(({ type, bookmarks }) => {
            return (
              <Accordion.Provider key={type}>
                <Flex
                  justify={'space-between'}
                  align={'center'}
                  etcStyles={{
                    width: '100%',
                    height: '54px',
                    backgroundColor: color.gray,
                    padding: spacer.spacing3,
                  }}
                >
                  <Flex align={'center'} gap={'12px'}>
                    <Accordion.Button id={type}>
                      <Accordion.Icon
                        id={type}
                        size={14}
                        color={color.white}
                        strokeWidth="8"
                      />
                    </Accordion.Button>
                    <div>
                      <Text
                        label={type}
                        type={'sm'}
                        textColor={color.white}
                        fontWeightType={'semibold'}
                      />
                    </div>
                  </Flex>
                  <Checkbox
                    id={type}
                    data-testid={type}
                    isChecked={checkType === type}
                    onClickAction={toggleCheckType(type)}
                    etcStyles={{
                      backgroundColor: color.gray100,
                    }}
                  />
                </Flex>
                <Accordion.Panel id={type}>
                  {bookmarks.map((bookmark) => {
                    return (
                      <AccordianBookmark
                        key={bookmark.id}
                        bookmark={bookmark}
                      />
                    );
                  })}
                </Accordion.Panel>
              </Accordion.Provider>
            );
          })}
        </>
      </div>
    </Flex>
  );
};

export default ClassifiedBookmarkForm;
