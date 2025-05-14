import React from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  margin: 1.5rem 0;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </SearchContainer>
  );
};

export default SearchBar;
