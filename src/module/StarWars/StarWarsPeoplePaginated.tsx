import React from 'react';
import {
  PreloadedQuery,
  graphql,
  usePaginationFragment,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay';
import { StarWarsPeopleQuery } from './__generated__/StarWarsPeopleQuery.graphql';

import { Button, Flex } from '@ttoss/ui';
import { Header } from '../../components/Header';

import { StarWarsPeoplePaginationQuery } from './__generated__/StarWarsPeoplePaginationQuery.graphql';
import { StarWarsPeoplePaginatedFragment_query$key } from './__generated__/StarWarsPeoplePaginatedFragment_query.graphql';

const starWarsPeople = graphql`
  query StarWarsPeoplePaginatedQuery {
    ...StarWarsPeoplePaginatedFragment_query
  }
`;

const starWarsPeopleFragment = graphql`
  fragment StarWarsPeoplePaginatedFragment_query on Root
  @refetchable(queryName: "StarWarsPeoplePaginationQuery")
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 3 }
  ) {
    allPeople(first: $count, after: $cursor)
      @connection(key: "StarWarsPeoplePaginated_allPeople") {
      edges {
        node {
          name
        }
      }
    }
  }
`;

const StarWarsPeopleList = ({
  starWarsQueryRef,
}: {
  starWarsQueryRef: PreloadedQuery<StarWarsPeopleQuery>;
}) => {
  const starWarsPreloadedQuery = usePreloadedQuery<StarWarsPeopleQuery>(
    starWarsPeople,
    starWarsQueryRef
  );

  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment<
    StarWarsPeoplePaginationQuery,
    StarWarsPeoplePaginatedFragment_query$key
  >(
    starWarsPeopleFragment,
    starWarsPreloadedQuery as unknown as StarWarsPeoplePaginatedFragment_query$key
  );

  return (
    <React.Suspense>
      <Flex sx={{ flexDirection: 'column', gap: 'md', alignItems: 'start' }}>
        {hasNext && (
          <Button
            disabled={isLoadingNext}
            loading={isLoadingNext}
            onClick={() => loadNext(1)}
          >
            Load More
          </Button>
        )}
        <ul>
          {data.allPeople?.edges?.map((obj) => {
            return <li key={obj?.node?.name}>{obj?.node?.name}</li>;
          })}
          {isLoadingNext && <li key='loading'>Loading...</li>}
        </ul>
      </Flex>
    </React.Suspense>
  );
};

export const StarWarsPeoplePaginated = () => {
  const [starWarsQueryRef, loadQuery, dispose] =
    useQueryLoader<StarWarsPeopleQuery>(starWarsPeople);

  React.useEffect(() => {
    loadQuery({
      first: 3,
    });

    return () => {
      dispose();
    };
  }, []);

  return (
    <React.Suspense fallback='Loading...'>
      <Header />

      {!!starWarsQueryRef && (
        <StarWarsPeopleList starWarsQueryRef={starWarsQueryRef} />
      )}
    </React.Suspense>
  );
};
