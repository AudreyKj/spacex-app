import styled from "styled-components";

export const SearchButton = styled.button`
  margin-left: ${props => (props.resetSearch ? "15px" : "15px")};
  margin-right: ${props => (props.resetSearch ? "15px" : "0")};

  cursor: pointer;
  font-size: 0.9rem;
  background: transparent;
  border: 1px solid black;
  padding: 5px;

  @media (max-width: 400px) {
    button.searchValue {
      margin-top: 15px;
    }
  }
`;

export const SearchInput = styled.input`
  margin-left: 5px;
  padding: 5px;
  border: 1px solid black;
  background-color: transparent;
`;