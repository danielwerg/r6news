import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { getNews } from '../src';

getNews({ limit: 32 })
  .then(async news => {
    const path = join(__dirname, '../news.json');
    const pathMin = join(__dirname, '../news.min.json');

    const prevContentMin = await readFile(pathMin, 'utf8');
    const nextContent = JSON.stringify(news, null, 2);
    const nextContentMin = JSON.stringify(news);

    if (prevContentMin === nextContentMin) {
      console.log('🦗 No changes');
    } else {
      console.log('🆕 News changed');
      await writeFile(path, nextContent);
      await writeFile(pathMin, nextContentMin);
      console.log('🖊️ Wrote changes');
    }
  })
  .catch(console.error);
