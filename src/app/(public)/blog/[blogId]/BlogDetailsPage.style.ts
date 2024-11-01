'use client';

import styled from 'styled-components';

const BlogDetailsPageStyle = styled.div`
  & {
    padding-top: 2rem;
    position: relative;
  }

  .left-bar {
    position: sticky;
    top: 14rem;
    height: fit-content;
    padding-right: 4rem;
  }

  .right-bar {
    margin-left: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    overflow-y: scroll;
  }

  article {
    html[data-theme='dark'] & {
      background-color: #030c23;
    }

    html[data-theme='light'] & {
      background-color: #f5f5f5;
    }

    border-radius: 1.6rem;
    overflow: hidden;
    position: relative;
    box-shadow: 0 0 1.6rem rgba(0, 0, 0, 0.2);
    padding-bottom: 4rem;

    /* no padding for cover image */

    & > *:not(:first-child) {
      padding-inline: 6rem;
    }
  }

  .blog-cover-img {
    position: relative;
    min-height: 30rem;

    & > img {
      object-fit: cover;
    }
  }

  .blog-meta {
    margin-block: 4rem;

    & .blog-published-date {
      font-size: 1.4rem;
      margin-bottom: 0.8rem;
    }
  }

  .blog-title {
    font-size: 4rem;
    font-weight: 900;
  }

  .blog-content {
    font-size: 1.8rem;
    line-height: 1.6;
    margin-bottom: 2rem;

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
    }

    code {
      border-radius: 0.5rem;
      margin-block: 1.6rem;
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
  }
`;

export { BlogDetailsPageStyle };
