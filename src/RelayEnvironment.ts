import {
  Environment,
  FetchFunction,
  Network,
  RecordSource,
  Store,
} from "relay-runtime";

const fetchQuery: FetchFunction = (operation, variables) => {
  return fetch("https://graphql-pokeapi.vercel.app/api/graphql", {
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
