import { DocumentNode } from 'graphql';
import { useEffect } from 'react';
import CustomError from '../../../../CustomError';
import LoadingSpinner from '../../../../LoadingSpinner';
import List from './List';
import { useLocation } from 'react-router-dom';
import { usePaginatedQueries } from '../../utility/hooks/usePaginatedQueries';
import { CollectionsClasses } from '../../utility/enums';

export interface ListProps {
  paginatedQuery: DocumentNode;
  listClass?: CollectionsClasses;
}

const CollectionList: React.FC<ListProps> = ({ paginatedQuery, listClass }) => {
  const location = useLocation();
  const refetchBoolean = location.state?.refetch;

  const { data, loading, error, refetch, pagination } = usePaginatedQueries(paginatedQuery, listClass);
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
      {!loading && !error && data && <List data={data} pagination={pagination} />}
    </div>
  );
};
export default CollectionList;
