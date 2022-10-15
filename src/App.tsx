import { useCallback, useEffect, useState } from "react";
import { fetchPokemons } from "./services/api.service";

import Autocomplete from "./components/Autocomplete/Autocomplete";
import { AutocompleteProvider } from "./context/AutocompleteContext";

function App() {
  return (
    <AutocompleteProvider>
      <Autocomplete />
    </AutocompleteProvider>
  );
}

export default App;
