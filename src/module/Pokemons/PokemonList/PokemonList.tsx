import { usePreloadedQuery } from "react-relay";
import { PokemonsQuery } from "../queries";
import { queries_PokemonsQuery } from "../__generated__/queries_PokemonsQuery.graphql";

export const PokemonList = ({ queryRef }: { queryRef: any }) => {
  const data = usePreloadedQuery<queries_PokemonsQuery>(
    PokemonsQuery,
    queryRef
  );

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
