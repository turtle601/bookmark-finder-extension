import React, { Suspense, useState } from 'react';
import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';

import debounce from '@/shared/lib/later/debounce';
import { spacer } from '@/shared/config/styles';

import {
  useAutoSearchMutation,
  searchService,
} from '@/entities/search/search.queries';

import AIIcon from '@/shared/config/assets/ai.svg';
import AISearchIcon from '@/shared/config/assets/ai-search.svg';

import Spacer from '@/shared/ui/spacer';
import Flex from '@/shared/ui/flex';
import Toggle from '@/shared/ui/toggle';
import NameSearchIcon from '@/shared/config/assets/name-search.svg';
import AutoSearchList from '@/features/search/autoSearch/autoSearchList.ui';
import { Input } from '@/shared/ui/input';

import { getFlushedFieldStyle } from '@/shared/ui/input/input.style';

const AutoSearch = () => {
  const [isAI, setIsAI] = useState(false);

  const { data: searchBookmarkResponseData } = useQuery(
    searchService.queryOptions(),
  );

  const placeholderText = isAI
    ? 'AI로 찾고 싶은 북마크를 물어보세요'
    : '링크를 검색하세요';

  const searchDelay = isAI ? 1500 : 500;

  const { mutate: searchBookmark } = useAutoSearchMutation(isAI);

  const debouncedSearch = debounce((value: string) => {
    searchBookmark({ text: value });
  }, searchDelay);

  const handleChangeText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleToggleSearchType = async () => {
    setIsAI(!isAI);
  };

  return (
    <article
      css={css({
        width: '100%',
      })}
    >
      <Flex
        align={'center'}
        etcStyles={{
          width: '100%',
        }}
      >
        <div
          css={css({
            position: 'relative',
            width: '100%',
            height: '60px',
          })}
        >
          <div
            css={css({
              position: 'absolute',
              pointerEvents: 'none',
              top: '50%',
              left: '0',
              transform: 'translateY(-50%)',
            })}
          >
            {isAI ? <AISearchIcon /> : <NameSearchIcon />}
          </div>
          <Input
            placeholder={placeholderText}
            onChange={handleChangeText}
            etcStyles={{
              ...getFlushedFieldStyle(),
            }}
          />
        </div>
        <Spacer direction="horizontal" space={spacer.spacing2} />
        <Flex align={'center'} gap={'12px'}>
          <AIIcon />
          <Toggle isChecked={isAI} onClick={handleToggleSearchType} />
        </Flex>
      </Flex>
      <Suspense fallback={'로딩 중입니다.'}>
        <AutoSearchList bookmarks={searchBookmarkResponseData} />
      </Suspense>
    </article>
  );
};

export default AutoSearch;
