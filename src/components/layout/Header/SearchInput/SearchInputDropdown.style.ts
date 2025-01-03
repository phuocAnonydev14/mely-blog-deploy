import styled from 'styled-components';

const SearchInputDropdownStyle = styled.div`
  font-size: 1.6rem;

  .ant-divider {
    margin-top: 0.4rem;
    margin-bottom: 0;
  }

  .anticon-loading {
    font-size: 3rem;
  }

  .search-dropdown {
    &-body {
      max-height: 200px;
      overflow-y: auto;
    }

    &-item,
    &-footer {
      transition: all 0.3s;
      cursor: pointer;
      padding-inline: 1.4rem;
      padding-block: 0.6rem;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    &-footer {
      font-size: 1.4rem;
    }

    &-group-header {
      font-size: 1.4rem;
      font-weight: 600;
      padding-inline: 1.4rem;
      margin-block: 0.4rem;
      color: rgba(255, 255, 255, 0.8);
    }

    &-subtitle {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.6);
    }

    &-title {
      font-weight: bold;
    }

    &-loading {
      padding-block: 2.4rem;
    }
  }

  .all-results-link {
    color: white;
  }
`;

export default SearchInputDropdownStyle;
