const findRS = (queryString) => callHutime(queryString);

const callHutime = async (queryString) => {

  const q = queryString;

  const calendars = [
    '1.1',
    '2.1',
    '101.1',
    '101.2',
    '102.1',
    // '103.1',
    // '104.1',
    '1001.1',
    '1001.2',
    '1002.2',
    // '1003.1',
    // '1004.1',
  ];

  const terms = ['date', 'month', 'year'];

  const urls = [];

  for (const calendar of calendars) {
    for (const term of terms) {
      urls.push(
        `https://datetime.hutime.org/calendar/${calendar}/${term}/${q}?out=rdf/json`,
      );
    }
  }

  // リクエストを並列に実行
  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json()
        return { url, data }; // 成功時はデータを返す
      } catch {
        return null; // エラーの場合は null を返す
      }
    }),
  ).then((results) => results.filter((result) => result !== null)); // null を除外

  const formattedResults = results.map((result) => {
    const data = result.data;
    const key = Object.keys(data)[0];
    const item = data[key];

    const label =
      item['http://www.w3.org/2000/01/rdf-schema#label'][0]['value'];

    const id = result.url.replace('?out=rdf/json', '');

    const spl = id.split('/');

    const alias = id.replace(spl[spl.length - 1], label);

    const calendar = item['http://resource.hutime.org/ontology/ofCalendar'][0]['value']

    const formattedResult = {
      nameType: "",
      id: alias,
      uri: key,
      uriForDisplay: '',
      name: label + " " + calendar, // '',
      repository: 'HuTime',
      originalQueryString: q,
      calendar,
    };

    if (item['http://resource.hutime.org/ontology/iso8601']) {
      // formattedResult['iso8601'] =
      formattedResult['description'] =
        item['http://resource.hutime.org/ontology/iso8601'][0]['value'];
    }

    return formattedResult;
  });

  return formattedResults;
};


export default {
  findRS,
};
