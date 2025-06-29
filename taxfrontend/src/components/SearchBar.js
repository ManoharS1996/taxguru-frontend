import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

const SearchContainer = styled.div`
  position: relative;
  margin: 1.5rem 0;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.grayLight};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.gray};
`;

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <SearchContainer>
      <SearchIcon size={18} />
      <SearchInput
        type="text"
        placeholder="Search articles by title or content..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </SearchContainer>
  );
};

export default SearchBar;