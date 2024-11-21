import { useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { useEffect, useMemo } from 'react';
import CustomError from '../../../../CustomError';
import LoadingSpinner from '../../../../LoadingSpinner';
import List from './List';
import { useLocation } from 'react-router-dom';

interface ListProps {
  query: DocumentNode;
  listClass?: 'authors' | 'books' | 'genres' | 'publishers' | 'translators' | 'bookSeries';
}

const CollectionList: React.FC<ListProps> = ({ query, listClass }) => {
  const location = useLocation();
  const refetchBoolean = location.state?.refetch;
  const { data, loading, error, refetch } = useQuery(query, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });

  const listData = useMemo(() => {
    if (data) {
      return data.authors ?? data.publishers ?? data.genres ?? data.translators ?? data.bookSeries ?? [];
    }
    return [];
  }, [data]);

  // Effect to handle refetching and updating list data
  useEffect(() => {
    if (refetchBoolean) {
      refetch();
    }
  }, [refetch, refetchBoolean]);

  return (
    <div className={`bookCollection__list ${listClass}`}>
      {loading && <LoadingSpinner />}
      {error && <CustomError text={error.message} />}
      {!loading && !error && <List data={listData} />}
    </div>
  );
};
export default CollectionList;
