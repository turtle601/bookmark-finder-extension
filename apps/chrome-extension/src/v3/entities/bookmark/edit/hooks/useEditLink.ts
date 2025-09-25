import { useDeleteBookmarkMutation } from '@/v3/entities/bookmark/tree/request/queries';

import type { ILink } from '@/v3/entities/bookmark/tree/types/bookmark';

export const useDeleteLink = (link: ILink) => {
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();

  const deleteLink = () => {
    deleteBookmark({ id: link.id });
  };

  return { deleteLink };
};

export const useMakeLinkEditButtonOptions = (link: ILink) => {
  const { deleteLink } = useDeleteLink(link);

  return {
    editButtonOptions: [{ label: 'Delete', action: deleteLink }],
  };
};
