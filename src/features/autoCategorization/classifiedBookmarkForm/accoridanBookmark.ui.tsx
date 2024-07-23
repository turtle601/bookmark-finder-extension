import { spacer } from '@/shared/config/styles';

import { BookmarkNode } from '@/entities/bookmark';
import Accordion from '@/shared/ui/accordion';
import Flex from '@/shared/ui/flex';

import type { Bookmark } from '@/entities/bookmark';

interface IAccordianBookmark {
  bookmark: Bookmark;
}

const AccordianBookmark = ({ bookmark }: IAccordianBookmark) => {
  return (
    <Flex
      key={bookmark.id}
      direction={'column'}
      etcStyles={{
        width: '100%',
        paddingLeft: spacer.spacing3,
      }}
    >
      {bookmark.children ? (
        <div>
          <Flex>
            <Accordion.Button id={bookmark.id}>
              <Accordion.Icon id={bookmark.id} size={14} />
            </Accordion.Button>
            <BookmarkNode key={bookmark.id} bookmark={bookmark} size={24} />
          </Flex>
          <Accordion.Panel id={bookmark.id}>
            {bookmark.children.map((bookmarkChild) => {
              return (
                <AccordianBookmark
                  key={bookmarkChild.id}
                  bookmark={bookmarkChild}
                />
              );
            })}
          </Accordion.Panel>
        </div>
      ) : (
        <BookmarkNode bookmark={bookmark} size={24} />
      )}
    </Flex>
  );
};

export default AccordianBookmark;
