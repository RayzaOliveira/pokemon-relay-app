import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.tsx'
// import './index.css'
import { PokemonList } from "./module/Pokemons/PokemonList/PokemonList";
import { RelayEnvironmentProvider } from "react-relay";
import environment from "./RelayEnvironment";
import { Pokemons } from "./module/Pokemons/Pokemons";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <Pokemons />
    </RelayEnvironmentProvider>
  </React.StrictMode>
);