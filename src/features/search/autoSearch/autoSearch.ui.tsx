import { css } from '@emotion/react';
import React, { Suspense, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  useAutoSearchMutation,
  searchService,
} from '@/entities/search/search.queries';

import { color } from '@/shared/config/styles';

import Flex from '@/shared/ui/flex';
import Toggle from '@/shared/ui/toggle';
import Input from '@/shared/ui/input';

import AIIcon from '@/shared/config/assets/ai.svg';
import AISearchIcon from '@/shared/config/assets/ai-search.svg';
import NameSearchIcon from '@/shared/config/assets/name-search.svg';
import AutoSearchList from '@/features/search/autoSearch/autoSearchList.ui';

import debounce from '@/shared/lib/later/debounce';

const AutoSearch = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
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
      <Flex align={'center'} gap={'8px'}>
        <Input inputName="flushed-leftIcon" inputValue="">
          <Input.LeftElement pointerEvents="none">
            {isAI ? <AISearchIcon /> : <NameSearchIcon />}
          </Input.LeftElement>
          <Input.Field
            ref={inputRef}
            kind="flushed"
            externalonChangeAction={handleChangeText}
            placeholder={placeholderText}
            etcStyles={{
              width: '100%',
              color: color.gray,
            }}
          />
        </Input>
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
