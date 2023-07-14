import axios from 'axios';

import { processNews } from './utils';
import type { CategoryFilter, PlacementFilter, NimbusItems } from './types';

export interface GetNewsOptions {
  /** Defaults to `'en-gb'` */
  locale?: string;
  /** Defaults to `'en-us'` */
  fallbackLocale?: string;
  /** Defaults to `'all'` */
  category?: CategoryFilter;
  placement?: PlacementFilter;
  /** Defaults to `6` */
  limit?: number;
  /** Defaults to `0` */
  skip?: number;
  /** Defaults to `0` */
  startIndex?: number;
  /** Defaults to `['BR-rainbow-six GA-siege']` */
  tags?: string[];
}
export const getNews = async ({
  locale = 'en-gb',
  fallbackLocale = 'en-us',
  category: categoriesFilter = 'all',
  placement: placementFilter = '',
  limit = 6,
  skip = 0,
  startIndex = 0,
  tags = ['BR-rainbow-six GA-siege', 'two']
}: GetNewsOptions = {}) =>
  await axios
    .request<NimbusItems>({
      method: 'GET',
      baseURL: 'https://nimbus.ubisoft.com',
      url: '/api/v1/items',
      params: new URLSearchParams({
        locale,
        fallbackLocale,
        categoriesFilter,
        placementFilter,
        limit: limit.toString(),
        skip: skip.toString(),
        startIndex: startIndex.toString(),
        tags
      }),
      headers: {
        Authorization: '3u0FfSBUaTSew-2NVfAOSYWevVQHWtY9q3VM8Xx9Lto'
      },
      timeout: 30_000
    })
    .then(res => processNews({ news: res.data, locale }));

export type GetNewsResponse = Awaited<ReturnType<typeof getNews>>;

export * from './utils';
export * from './types';
