import { graphql } from "relay-runtime";

export const PokemonsQuery = graphql`
  query queries_PokemonsQuery($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        url
        name
        image
      }
    }
  }
`;

// export const pokemonListQueryString = graphql`
//   query PokemonListQuery($limit: Int, $offset: Int) {
//     ...PokemonListFragment_query
//     # pokemons(limit: $limit, offset: $offset) {
//     #   count
//     #   next
//     #   previous
//     #   nextOffset
//     #   prevOffset
//     #   status
//     #   message
//     #   results {
//     #     url
//     #     name
//     #     image
//     #   }
//     # }
//   }
// `;

// export const pokemonListFragment_query = graphql`
//   fragment PokemonListFragment_query on Query
//   @refetchable(queryName: "PokemonListPaginationQuery") {
//     pokemons(limit: $limit, offset: $offset)
//       @connection(key: "PokemonListFragment_query_pokemons") {
//       # edges {
//       #   node {
//       #     name
//       #     image
//       #   }
//       # }
//       count
//       # next
//       # previous
//       # nextOffset
//       # prevOffset
//       # status
//       # message
//       # results {
//       #   url
//       #   name
//       #   image
//       # }
//     }
//   }
// `;
