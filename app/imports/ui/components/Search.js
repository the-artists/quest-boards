import React from 'react';

const Search = ({ onChange }) => (
    <input
        type="text"
        onChange={onChange}
        placeholder="Skills..."
    />
);

export default Search;
