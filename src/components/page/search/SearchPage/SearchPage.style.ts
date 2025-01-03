import styled from 'styled-components';

const SearchPageStyle = styled.div`
  padding-inline: 20rem;
  padding-top: 2rem;

  h1 {
    font-size: 2.8rem;
    font-weight: bold;
    margin-bottom: 3rem;
  }

  .search-type {
    display: inline-block;
    transition: background-color 0.3s;
    user-select: none;
    cursor: pointer;
    padding-inline: 2rem;
    padding-block: 1.2rem;
    border-top-left-radius: 1.2rem;
    border-top-right-radius: 1.2rem;
    border-bottom: 2px solid transparent;
    font-size: 1.6rem;
    color: white;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    &.activated {
      color: var(--yellow-primary);
      font-weight: bold;
      border-bottom-color: var(--yellow-primary);
    }
  }

  .results-container {
    margin-top: 4rem;
  }

  .search-page-pagination {
    margin-top: 2rem;
    margin-bottom: 6rem;
  }

  .search-page-query {
    color: var(--yellow-primary);

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default SearchPageStyle;
