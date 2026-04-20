import React from 'react';
import { MdSearch, MdClose } from 'react-icons/md';
import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = 'Search transactions...' }) => {
  return (
    <div className="search-bar">
      <MdSearch className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')}>
          <MdClose />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
