import type { NimbusItems, ItemType } from './types';

export interface GetNewsURLOptions {
  type: ItemType;
  path: string;
  locale: string;
}
export const getNewsURL = ({ type, path, locale }: GetNewsURLOptions) =>
  type === 'videos'
    ? `https://youtube.com/watch?v=${path}`
    : `https://ubisoft.com/${locale}/game/rainbow-six/siege/news-updates${path}`;

export interface ProcessNewsOptions {
  news: NimbusItems;
  locale: string;
}
export const processNews = ({ news, locale }: ProcessNewsOptions) =>
  news.items.map(item => ({
    id: item.id,
    title: item.title.trim(),
    abstract: item.abstract?.trim(),
    thumbnail: item.thumbnail.url?.length ? item.thumbnail.url : null,
    content: item.content,
    categories: item.categories,
    readTime: item.readTime,
    url: getNewsURL({
      type: item.type,
      path: item.button.buttonUrl,
      locale
    }),
    date: new Date(item.date).toISOString()
  }));
