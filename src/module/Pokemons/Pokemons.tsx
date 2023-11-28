import React from "react";
import { useQueryLoader } from "react-relay";
import { PokemonList, pokemonListQuery } from "./PokemonList/PokemonList";
import { PokemonListQuery } from "./PokemonList/__generated__/PokemonListQuery.graphql";

export const Pokemons = () => {
  const [pokemonListQueryRef, loadPokemonListQuery, disposePokemonListQuery] =
    useQueryLoader<PokemonListQuery>(pokemonListQuery);

  React.useEffect(() => {
    return () => {
      disposePokemonListQuery();
    };
  }, []);

  if (!pokemonListQueryRef) {
    return (
      <button
        onClick={() =>
          loadPokemonListQuery({
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
        <PokemonList queryRef={pokemonListQueryRef} />
      </React.Suspense>
    </div>
  );
};
