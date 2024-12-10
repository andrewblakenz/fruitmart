import React from "react";
import SearchIcon from "./icons/SearchIcon";

const Searchbar = () => {
  return (
    <div className="searchbar">
      <SearchIcon />
      <input className="searchbar__input" type="text" placeholder="Search fresh fruit" />
    </div>
  );
};

export default Searchbar;
