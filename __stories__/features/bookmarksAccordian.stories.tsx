import DnD from '@/shared/ui/dnd';
import BookmarksAccordian from '@/features/bookmark/boomarksAccordian';
import Accordion from '@/shared/ui/accordion';

import type { Meta, StoryObj } from '@storybook/react';
import { css } from '@emotion/react';

const meta: Meta<typeof BookmarksAccordian> = {
  title: 'features/BookmarksAccordian',
  component: BookmarksAccordian,
  decorators: [
    // eslint-disable-next-line @typescript-eslint/naming-convention
    (Story) => (
      <DnD.Provider>
        <DnD.Boundary width={'720px'} height={'100vh'}>
          <div
            css={css({
              width: '360px',
            })}
          >
            <DnD.PointerContent
              customStyle={() => {
                return {
                  maxWidth: '240px',
                  minWidth: '200px',
                };
              }}
            />
            <Accordion.Provider>
              <Story />
            </Accordion.Provider>
          </div>
        </DnD.Boundary>
      </DnD.Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof BookmarksAccordian>;

export const Default: Story = {
  args: {
    bookmarks: [
      {
        id: '0',
        title: '',
        dateAdded: 1722947244002,
        children: [
          {
            id: '1',
            index: 0,
            parentId: '0',
            title: '북마크바',
            dateAdded: 1669445308155,
            dateGroupModified: 1720798314751,
            children: [
              {
                id: '23',
                index: 0,
                parentId: '1',
                title: 'turtle601 (황준승)',
                url: 'https://github.com/turtle601',
                dateAdded: 1718226309333,
              },
              {
                id: '27',
                index: 1,
                parentId: '0',
                title: '호영이',
                dateAdded: 1669445308155,
                dateGroupModified: 1720798314751,
                children: [
                  {
                    id: '58',
                    index: 0,
                    parentId: '27',
                    title: '보성이 깃허브',
                    url: 'https://github.com/turtle601',
                    dateAdded: 1718226309333,
                  },
                ],
              },
            ],
          },
          {
            id: '21',
            index: 1,
            parentId: '1',
            title: '유튜브',
            dateAdded: 1718225677121,
            dateGroupModified: 1720251663115,
            children: [
              {
                id: '26',
                index: 0,
                parentId: '21',
                title:
                  "감정 이입이 될 수밖에 없는 박원(PARK WON)의♬ 'all of my life'｜비긴어게인 오픈마이크 - YouTube",
                url: 'https://www.youtube.com/watch?v=9maA5uDvrDI',
                dateAdded: 1718936888249,
              },
            ],
          },
          {
            id: '33',
            index: 2,
            parentId: '1',
            title: '무료 아이콘 SVG, PNG, ICO 또는 ICNS',
            url: 'https://icon-icons.com/ko/',
            dateAdded: 1719455399491,
          },
        ],
      },
    ],
  },
};
