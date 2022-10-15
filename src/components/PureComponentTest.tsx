import React, { memo } from "react";
import useAutocomplete from "../hooks/useAutocomplete";

function PureComponentTest() {
  const { options } = useAutocomplete();
  return <div>{options[0]}</div>;
}

export default memo(PureComponentTest);
