import React from 'react';
import { css } from '@emotion/react';

import { color, spacer } from '@/shared/config/styles';

import { bookmarkService } from '@/entities/bookmark';

import WarningIcon from '@/shared/config/assets/warning.svg';

import Flex from '@/shared/ui/flex';
import Text from '@/shared/ui/text';
import Spacer from '@/shared/ui/spacer';
import Button from '@/shared/ui/button';
import Radio from '@/shared/ui/radio';
import Accordion from '@/shared/ui/accordion';
import { OpenSidebarDefault } from '@/app/modal-router';

import {
  addBookmarkbar,
  addEtcBookmarkbar,
  addEtcBookmarkToDefault,
  getClassifedBookmarkGuideText,
} from './classifyBookmarkForm.lib';

import { ClassifiedBookmarkFolder } from './classifiedBookmarkFolder.ui';

import { useCheckedBookmarkStructure } from './classifyBookmarkForm.hook';

import type { Bookmark } from '@/entities/bookmark';

const ClassifyBookmarkForm: React.FC = () => {
  const {
    classifiedAIBookmarks,
    errorMessage,
    register,
    submitCheckedBookmarkStructure,
  } = useCheckedBookmarkStructure();

  if (!classifiedAIBookmarks) return <></>;

  const bookmarkCache = bookmarkService.getCache() as Bookmark[];

  const createdBookmarkVersionList = [
    addBookmarkbar(classifiedAIBookmarks),
    addEtcBookmarkbar(classifiedAIBookmarks),
    addEtcBookmarkToDefault(bookmarkCache, classifiedAIBookmarks),
  ];

  return (
    <Flex direction={'column'}>
      <Text
        label={'적용하고 싶은 폴더 구조를 선택해주세요'}
        fontWeightType="semibold"
        color={color.gray}
        etcStyles={{
          textAlign: 'center',
          width: '100%',
        }}
      />
      <Spacer direction="vertical" space={spacer.spacing2} />
      <div
        css={css({
          height: `calc(100vh - 264px)`,
          overflow: 'auto',
        })}
      >
        {createdBookmarkVersionList.map((bookmarkVersion, idx) => {
          return (
            <>
              <Accordion.Provider>
                <Flex
                  justify={'space-between'}
                  align={'center'}
                  etcStyles={{
                    width: '100%',
                    height: '40px',
                    backgroundColor: color.gray,
                    padding: `0 ${spacer.spacing3}`,
                  }}
                >
                  <Flex align={'center'} gap={'12px'}>
                    <Accordion.Button id={`TYPE-${idx + 1}`}>
                      <Accordion.Icon
                        id={`TYPE-${idx + 1}`}
                        size={14}
                        color={color.white}
                        strokeWidth="8"
                      />
                    </Accordion.Button>
                    <div>
                      <Text
                        label={`TYPE-${idx + 1}`}
                        type={'sm'}
                        textColor={color.white}
                        fontWeightType={'semibold'}
                      />
                    </div>
                  </Flex>
                  <Radio
                    {...register({
                      id: `TYPE-${idx + 1}`,
                      name: 'classify-bookmark',
                    })}
                  />
                </Flex>
                <Accordion.Panel id={`TYPE-${idx + 1}`}>
                  <Flex
                    align={'center'}
                    etcStyles={{
                      width: '100%',
                      height: '28px',
                      backgroundColor: color.gray100,
                    }}
                  >
                    <Text
                      label={getClassifedBookmarkGuideText(idx + 1)}
                      type={'sm'}
                      textColor={color.purple}
                      etcStyles={{
                        marginLeft: spacer.spacing3,
                      }}
                    />
                  </Flex>
                  <div
                    css={css({
                      padding: `0 ${spacer.spacing3}`,
                    })}
                  >
                    {bookmarkVersion.map((folderData) => {
                      return (
                        <>
                          <ClassifiedBookmarkFolder
                            folderData={folderData}
                            bookmarks={folderData.children as Bookmark[]}
                          />
                        </>
                      );
                    })}
                  </div>
                </Accordion.Panel>
              </Accordion.Provider>
            </>
          );
        })}
      </div>
      <Spacer direction="vertical" space={spacer.spacing3} />
      <Flex
        align={'center'}
        justify={'center'}
        etcStyles={{
          width: '100%',
          height: '20px',
        }}
      >
        <div>{!!errorMessage && <WarningIcon />}</div>
        <span
          css={css({
            marginLeft: spacer.spacing1,
          })}
        >
          <Text label={errorMessage} textColor={color.red} />
        </span>
      </Flex>
      <Spacer direction="vertical" space={spacer.spacing2} />
      <Flex justify={'space-between'} etcStyles={{ width: '100%' }}>
        <OpenSidebarDefault>
          <Button
            kind="danger"
            etcStyles={{
              width: '80px',
              height: '40px',
            }}
          >
            <Text textColor={color.white} label={'취소'} />
          </Button>
        </OpenSidebarDefault>
        <OpenSidebarDefault>
          <Button
            kind={'valid'}
            etcStyles={{
              width: '80px',
              height: '40px',
            }}
            onClick={submitCheckedBookmarkStructure}
          >
            <Text textColor={color.white} label={`수정`} />
          </Button>
        </OpenSidebarDefault>
      </Flex>
    </Flex>
  );
};

export default ClassifyBookmarkForm;
