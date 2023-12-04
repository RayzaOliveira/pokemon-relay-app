import React from 'react';
import {
  PreloadedQuery,
  graphql,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay';
import { StarWarsPeopleQuery } from './__generated__/StarWarsPeopleQuery.graphql';
import { Header } from '../../components/Header';
import { Button } from '@ttoss/ui';

const starWarsPeople = graphql`
  query StarWarsPeopleQuery($first: Int!) {
    allPeople(first: $first) {
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
  const data = usePreloadedQuery<StarWarsPeopleQuery>(
    starWarsPeople,
    starWarsQueryRef
  );
  return (
    <React.Suspense fallback='Loading...'>
      <ul>
        {data.allPeople?.edges?.map((obj) => {
          return <li key={obj?.node?.name}>{obj?.node?.name}</li>;
        })}
      </ul>
    </React.Suspense>
  );
};

export const StarWarsPeople = () => {
  const [starWarsQueryRef, loadQuery, dispose] =
    useQueryLoader<StarWarsPeopleQuery>(starWarsPeople);

  React.useEffect(() => {
    return () => {
      dispose();
    };
  }, []);

  const [first, setFirst] = React.useState(5);

  React.useEffect(() => {
    loadQuery({ first });
  }, [first]);

  return (
    <React.Suspense fallback='Loading...'>
      <Header />

      <Button onClick={() => setFirst((prev) => prev + 1)}>Load More</Button>

      {!!starWarsQueryRef && (
        <StarWarsPeopleList starWarsQueryRef={starWarsQueryRef} />
      )}
    </React.Suspense>
  );
};
