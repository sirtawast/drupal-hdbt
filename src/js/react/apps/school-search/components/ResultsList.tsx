import { SyntheticEvent, useState } from 'react';
import { Button, IconMap, IconMenuHamburger, LoadingSpinner } from 'hds-react';
import GlobalSettings from '../enum/GlobalSettings';
import Result from '@/types/Result';
import { School } from '../types/School';
import ResultCard from './ResultCard';
import Pagination from '@/react/common/Pagination';
import ResultsMap from './ResultsMap';

type ResultsListProps = {
  data: any;
  error: boolean;
  isLoading: boolean;
  isValidating: boolean;
  page?: number;
  updatePage: Function
}

const ResultsList = ({ data, error, isLoading, isValidating, page, updatePage }: ResultsListProps) => {
  const [useMap, setUseMap] = useState<boolean>(false);
  const { size } = GlobalSettings;

  if (isLoading || isValidating) {
    return <LoadingSpinner />;
  }

  // @todo: Implement no results message
  if (!data?.hits?.hits.length || error) {
    return (
      <div className='react-search__no-results'>
        No results
      </div>
    );
  }

  const results = data.hits.hits;
  const total = data.hits.total.value;
  const pages = Math.floor(total / size);
  const addLastPage = total > size && total % size;

  const showPagination = !useMap && (pages > 1 || addLastPage);

  return (
    <div className='react-search__results'>
      <div className='react-search__result-top-area'>
        <div className='react-search__results-stats'>
          <div className='react-search__count-container'>
            {!Number.isNaN(total) &&
              <> 
                <span className='react-search__count'>{total}</span>
                <span> {Drupal.t('schools', {}, {context: 'School search results statline'})}</span>
              </>
            }
          </div>
        </div>
        <Button
          onClick={() => setUseMap(!useMap)}
          iconRight={useMap ? <IconMenuHamburger /> : <IconMap />}
          theme='black'
          type='button'
          variant='secondary'
        >
          {useMap ?
            Drupal.t('Show schools as a list') :
            Drupal.t('Show schools on map')
          }
        </Button>
      </div>
      {
        useMap ?
          <ResultsMap ids={data?.aggregations?.ids?.buckets} />
        :
          <>
            {results.map((hit: Result<School>) => (
                <ResultCard key={hit._id} {...hit._source} />
              ))
            }
          </>
      }
      {
        showPagination &&
        <Pagination
          currentPage={page || 1}
          pages={5}
          totalPages={addLastPage ? pages + 1 : pages}
          updatePage={(e: SyntheticEvent, nextPage: number) => {
            e.preventDefault();
            updatePage(nextPage);
          }}  
        />
      }
    </div>
  );
};

export default ResultsList;
