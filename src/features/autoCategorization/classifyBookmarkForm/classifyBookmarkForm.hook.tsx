import { useState } from 'react';

import { useForm } from '@/shared/hooks/useForm';
import { classifyService } from '@/entities/classify';
import { MutationState, useMutationState } from '@tanstack/react-query';
import { updateAIBookmark } from '@/entities/bookmark';

import type { ICategoryBookmark } from '@/entities/classify';
import type { FormRefValueType } from '@/shared/hooks/useForm';

export const useCheckedBookmarkStructure = () => {
  const { data: classifiedAIBookmarks } = useMutationState<
    MutationState<ICategoryBookmark[] | null>
  >({
    filters: { mutationKey: classifyService.queryKey() },
  })[0];

  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleOnSubmit } = useForm();

  const submitAction =
    (e: React.MouseEvent) => (formRefValue: FormRefValueType) => {
      const checkedElement = Array(3)
        .fill(0)
        .reduce<HTMLInputElement[]>((acc, cur, idx) => {
          const element = formRefValue[`TYPE-${idx + 1}`].element;
          if (element.checked) acc.push(element);

          return acc;
        }, []);

      const isChecked = checkedElement.length > 0;

      if (!isChecked) {
        e.stopPropagation();
        setErrorMessage('원하는 북마크 폴더 구조 하나를 체크해주세요');
      } else {
        updateAIBookmark({
          type: checkedElement[0].id,
          aiBookmarkData: classifiedAIBookmarks as ICategoryBookmark[],
        });
      }
    };

  const submitCheckedBookmarkStructure = (e: React.MouseEvent) => {
    handleOnSubmit({ action: submitAction(e) });
  };

  const focusAction = () => {
    setErrorMessage('');
  };

  return {
    classifiedAIBookmarks,
    errorMessage,
    register,
    focusAction,
    submitCheckedBookmarkStructure,
  };
};
