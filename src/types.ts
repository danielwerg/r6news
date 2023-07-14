export type CategoryFilter =
  | 'all'
  | 'game-updates'
  | 'patch-notes'
  | 'community'
  | 'store'
  | 'esports';

export type PlacementFilter =
  | ''
  | 'featured-news-article'
  | 'featured-news-article-emea'
  | 'featured-news-article-ncsa';

export type ItemType = 'news' | 'videos';
export interface URLAndDescription {
  url: string | null;
  description: string | null;
}
export interface ButtonOrNodeBase {
  buttonType: 'internal' | 'youtube-modal';
  buttonUrl: string;
  trackingCategoryValue: string;
  trackingValue: string;
}
export interface Button extends ButtonOrNodeBase {
  commonTranslationId: 'readMore' | 'watchNow';
}
export interface NimbusItemsItemBase {
  id: string;
  type: ItemType;
  tag: string;
  categories: string[] | null;
  placement: string[] | null;
  date: string;
  title: string;
  /** Used to be `string` when `mediaFilter` === `video` but `mediaFilter` was removed from API */
  description?: string;
  abstract?: string | null;
  content: string;
  trackingPageValue: string | null;
  readTime?: number;
  authors?: string[] | null;
  featuredThumbnail?: URLAndDescription;
  thumbnail: URLAndDescription;
  button: Button;
}
export interface NimbusItemsBase {
  total: number;
  tags: string[];
  items: NimbusItemsItemBase[];
}

export interface NimbusItems extends NimbusItemsBase {
  mediaFilter: string;
  categoriesFilter: string;
  placementFilter: PlacementFilter[];
  limit: number;
  startIndex: number;
  skip: number;
  items: NimbusItemsItemBase[];
}
