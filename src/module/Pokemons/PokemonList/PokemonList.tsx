import { PreloadedQuery, graphql, usePreloadedQuery } from "react-relay";
import { PokemonListQuery } from "./__generated__/PokemonListQuery.graphql";

export const pokemonListQuery = graphql`
  query PokemonListQuery($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        url
        name
        image
      }
    }
  }
`;

export const PokemonList = ({
  queryRef,
}: {
  queryRef: PreloadedQuery<PokemonListQuery>;
}) => {
  const data = usePreloadedQuery<PokemonListQuery>(pokemonListQuery, queryRef);

  return (
    <div>
      {/* <pre>{JSON.stringify({ data })}</pre> */}
      <ul>
        {data.pokemons?.results?.map((pokemon) => {
          return (
            <li key={pokemon?.name}>
              <p>{pokemon?.name}</p>
              <img src={pokemon?.image ?? ""} width={80} height={80} />
            </li>
          );
        })}
      </ul>

      <button>Load more</button>
    </div>
  );
};
