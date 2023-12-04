import {
  Environment,
  FetchFunction,
  Network,
  RecordSource,
  Store,
} from "relay-runtime";

const URLS = [
  'https://graphql-pokeapi.vercel.app/api/graphql',
  'https://graphql-pokemon2.vercel.app/',
  'https://swapi-graphql.netlify.app/.netlify/functions/index'
]

const fetchQuery: FetchFunction = (operation, variables) => {
  return fetch(URLS[2], {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then((response) => {
    return response.json();
  });
};

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
  requiredFieldLogger: (args) => {
    // eslint-disable-next-line no-console
    console.error(args);
  },
});

export default environment;
