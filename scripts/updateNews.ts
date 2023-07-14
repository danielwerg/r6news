import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { getNews } from '../src';

getNews({ limit: 32 })
  .then(async news => {
    const path = join(__dirname, '../news.json');

    const prevContent = await readFile(path, 'utf8');
    const nextContent = JSON.stringify(news);

    if (prevContent === nextContent) {
      console.log('🦗 No changes');
    } else {
      console.log('🆕 News changed');
      await writeFile(path, nextContent);
      console.log('🖊️ Wrote changes');
    }
  })
  .catch(console.error);
