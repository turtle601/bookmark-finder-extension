export interface ISearchBookmarkLink {
  id: string;
  title: string;
  url: string;
  faviconUrl: string;
}

export interface ISearchAIBookmarkLink extends ISearchBookmarkLink {
  score: number;
}
