import { MutationState, useMutationState } from '@tanstack/react-query';

import { useForm } from '@/shared/hooks/useForm';

import { classifyService } from '@/entities/classify';

import type { ICategoryBookmark } from '@/entities/classify';
import type { FormRefValueType } from '@/shared/hooks/useForm';
import { useUpdateAIBookmarks } from '@/entities/bookmark';

export const useCheckedBookmarkStructure = () => {
  const { data: classifiedAIBookmarks } = useMutationState<
    MutationState<ICategoryBookmark[] | null>
  >({
    filters: { mutationKey: classifyService.queryKey() },
  })[0];

  const { mutate: updateAIBookmarks } = useUpdateAIBookmarks();

  const { errorMessage, register, handleOnSubmit } = useForm();

  const submitCheckedBookmarkStructure = (e: React.MouseEvent) => {
    const getCheckedElement = (formRefValue: FormRefValueType) => {
      return Array(3)
        .fill(0)
        .reduce<HTMLInputElement[]>((acc, cur, idx) => {
          const element = formRefValue[`TYPE-${idx + 1}`].element;
          if (element.checked) acc.push(element);

          return acc;
        }, []);
    };

    const validateChecked = (formRefValue: FormRefValueType) => {
      const checkedElement = getCheckedElement(formRefValue);

      const isChecked = checkedElement.length > 0;
      if (!isChecked) e.stopPropagation();
      return isChecked;
    };

    const action = (formRefValue: FormRefValueType) => {
      const checkedElement = getCheckedElement(formRefValue);

      updateAIBookmarks({
        type: checkedElement[0].id,
        aiBookmarkData: classifiedAIBookmarks as ICategoryBookmark[],
      });
    };

    handleOnSubmit({
      action,
      wholeValidate: [
        {
          fn: validateChecked,
          errorMessage: '원하는 북마크 폴더 구조 하나를 체크해주세요',
        },
      ],
    });
  };

  return {
    classifiedAIBookmarks,
    errorMessage,
    register,
    submitCheckedBookmarkStructure,
  };
};
