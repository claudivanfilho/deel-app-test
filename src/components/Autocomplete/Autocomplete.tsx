import React, { useState } from "react";
import OptionsList from "./OptionsList";

export default function Autocomplete({
  text,
  onChange,
  options,
}: {
  text: string;
  onChange: (text: string) => Promise<void>;
  options: string[];
}) {
  const [focused, setFocused] = useState(false);
  const isOptionsListVisible = focused && options.length > 0;

  return (
    <div className="autocomplete__wrapper">
      <label htmlFor="searchText">Search for a pokemon</label>
      <div className="autocomplete__dropdown">
        <input
          id="searchText"
          data-testid="search-input"
          value={text}
          onChange={(evt) => onChange(evt.target.value)}
          onFocus={() => setFocused(true)}
          autoComplete="off"
        />
        {isOptionsListVisible && (
          <OptionsList
            text={text}
            onChange={(text) => onChange(text).then(() => setFocused(false))}
            options={options}
            onBlur={() => setFocused(false)}
          />
        )}
      </div>
    </div>
  );
}
