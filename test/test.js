import fetchMock from 'fetch-mock';
import hutime from '../src/index.js';

fetchMock.config.overwriteRoutes = false;

const queryString = '昭和63年8月8日';

['findRS'].forEach((nameOfLookupFn) => {
  test(nameOfLookupFn, async () => {
    const results = await hutime[nameOfLookupFn](queryString);

    console.log({ results })
  });
});
