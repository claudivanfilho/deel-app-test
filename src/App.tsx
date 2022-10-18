import { useState } from "react";
import Autocomplete from "./components/Autocomplete/Autocomplete";
import usePokemons from "./hooks/usePokemons";

function App() {
  const [text, setText] = useState("");
  const { pokemons } = usePokemons();
  const [options, setOptions] = useState<string[]>([]);

  const fetchAutocompleteOptions = async (searchText: string) => {
    return pokemons.filter((name) => {
      const sanitizedText = searchText.replace(/[^A-Z]+/gi, "");
      return sanitizedText && new RegExp(sanitizedText, "ig").test(name);
    });
  };

  const onChange = async (value: string) => {
    const filteredNames = await fetchAutocompleteOptions(value);
    setText(value);
    setOptions(filteredNames);
  };

  return <Autocomplete text={text} onChange={onChange} options={options} />;
}

export default App;
