import { useState } from "react";
import SearchFormDisplayBar from "./SearchFormDisplayBar";
import SearchFormDisplayTips from "./SearchFormDisplayTips";

const SearchFormDisplay = () => {
  const [inputIndex, setInputIndex] = useState("");

  return (
    <div>
      <SearchFormDisplayBar
        inputIndex={inputIndex}
        setInputIndex={setInputIndex}
      />
      <SearchFormDisplayTips setInputIndex={setInputIndex} />
    </div>
  );
};

export default SearchFormDisplay;
