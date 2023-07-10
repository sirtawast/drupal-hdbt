import useLanguageQuery from '@/react/common/hooks/useLanguageQuery';
import IndexFields from '../enum/IndexFields';
import URLParams from '../types/URLParams';
import Global from '../enum/Global';

const useQueryString = (urlParams: URLParams) => {
  const languageFilter = useLanguageQuery();
  const size = Global.SIZE;
  const page = Number.isNaN(Number(urlParams.page)) ? 1 : Number(urlParams.page);
  const must: any[] = [];

  if (urlParams?.topic?.length) {
    must.push({
      terms: {
        [IndexFields.NEWS_TAGS]: urlParams.topic
      }
    });
  }

  if (urlParams?.groups?.length) {
    must.push({
      terms: {
        [IndexFields.NEWS_GROUPS]: urlParams.groups
      }
    });
  }

  if (urlParams?.neighbourhoods?.length) {
    must.push({
      terms: {
        [IndexFields.NEIGHBOURHOODS]: urlParams.neighbourhoods
      }
    });
  }

  const query: any = {
    ...languageFilter
  };

  return JSON.stringify({
    size,
    from: size * (page - 1),
    query
  });
};

export default useQueryString;
