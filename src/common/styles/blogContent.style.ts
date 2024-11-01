import { css } from 'styled-components';

const blogContentStyle = css`
  font-size: 1.8rem;
  line-height: 1.6;

  h2 {
    font-size: 2em;
    font-weight: 600;
    margin-block: 0.9em;
  }

  h3 {
    font-size: 1.5em;
    font-weight: 600;
    margin-block: 0.9em;
  }

  h4 {
    font-size: 1.17em;
    font-weight: 600;
    margin-block: 0.9em;
  }

  strong {
    font-weight: bold;
  }

  i {
    font-style: italic;
  }

  u,
  a {
    text-decoration: underline;
  }

  sup {
    vertical-align: super;
    font-size: smaller;
  }

  sub {
    vertical-align: sub;
    font-size: smaller;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin-block: 2rem;
    & td,
    & th {
      border: 1px solid;
      padding: 1rem;
    }
    & th {
      color: var(--charcoal);
    }
  }

  ul,
  ol {
    padding-left: 3rem;
    padding-block: 1.5rem;
    & ul {
      padding-block: 0.5rem;
    }
    & li {
      padding-block: 0.5rem;
    }
  }

  ul {
    list-style-type: disc;

    & ul {
      list-style-type: circle;

      & ul {
        list-style-type: square;
      }
    }
  }
  ol {
    list-style-type: decimal;
  }

  pre {
    tab-size: 2;
    margin-block: 1rem;
  }

  code {
    border-radius: 0.5rem;
  }

  *:not(pre) > code {
    html[data-theme='dark'] & {
      background-color: #0d1117;
    }

    html[data-theme='light'] & {
      background-color: #f6f8fa;
    }

    padding: 0.2rem 0.4rem;
  }

  blockquote {
    border-left-color: var(--yellow-primary);
    padding-inline: 1.5em;

    html[data-theme='dark'] & {
      color: #bdbdbd;
    }

    html[data-theme='light'] & {
      color: #909090;
    }
  }
`;

export default blogContentStyle;
