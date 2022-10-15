import React from "react";
import useAutocomplete from "../../hooks/useAutocomplete";
import OptionsList from "./OptionsList";

export default function Autocomplete() {
  const { setText, text, error, loading, isOptionsListVisible, setIsInputFocused } =
    useAutocomplete();

  return (
    <div className="autocomplete__wrapper">
      <label htmlFor="searchText">Search for a pokemon</label>
      <div className="autocomplete__dropdown">
        <input
          id="searchText"
          data-testid="search-input"
          value={text}
          onChange={(evt) => setText(evt.target.value)}
          onFocus={() => setIsInputFocused(true)}
          autoComplete="off"
        />
        {isOptionsListVisible && (
          <OptionsList
            onBlur={() => {
              setIsInputFocused(false);
            }}
          />
        )}
        <div className="autocomplete__status">
          {error && <div>Error on request</div>}
          {loading && <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
}
