import React from "react";
import {
  QueryRenderer,
  graphql,
  useLazyLoadQuery,
  usePreloadedQuery,
  useQueryLoader,
} from "react-relay";
// import { useQueryLoader } from "react-relay/hooks";
import environment from "../../RelayEnvironment";
import { PokemonList } from "./PokemonList/PokemonList";
import { PokemonsQuery } from "./queries";
import { PokemonListQuery } from "./PokemonList/__generated__/PokemonListQuery.graphql";
import { queries_PokemonsQuery } from "./__generated__/queries_PokemonsQuery.graphql";

export const Pokemons = () => {
  // const { pokemons } = useLazyLoadQuery<PokemonListQuery>(
  //   graphql`
  //     query PokemonListQuery($limit: Int, $offset: Int) {
  //       pokemons(limit: $limit, offset: $offset) {
  //         count
  //         next
  //         previous
  //         nextOffset
  //         prevOffset
  //         status
  //         message
  //         results {
  //           url
  //           name
  //           image
  //         }
  //       }
  //     }
  //   `,
  //   {
  //     limit: 10,
  //     offset: 0,
  //   }
  // );

  const [pokemonsQueryRef, loadPokemonsQuery, disposePokemonListQuery] =
    useQueryLoader<queries_PokemonsQuery>(PokemonsQuery);

  React.useEffect(() => {
    return () => {
      disposePokemonListQuery();
    };
  }, []);

  if (!pokemonsQueryRef) {
    return (
      <button
        onClick={() =>
          loadPokemonsQuery({
            limit: 10,
            offset: 0,
          })
        }
      >
        Load
      </button>
    );
  }

  return (
    <div>
      <React.Suspense fallback="Loading">
        <PokemonList queryRef={pokemonsQueryRef} />
      </React.Suspense>
    </div>
  );
};
