'use client';

import styled from 'styled-components';

const AboutAuthorSummaryStyle = styled.div`
  .about-author-summary {
    html[data-theme='dark'] & {
      background-color: #070c20;
    }

    html[data-theme='light'] & {
      background-color: #f5f5f5;
    }

    border-radius: 1.6rem;

    .ant-card-head-title {
      font-size: 1.17em;
    }

    p {
      html[data-theme='dark'] & {
        color: #bdbdbd;
      }

      html[data-theme='light'] & {
        color: #333333;
      }

      font-size: 1.6rem;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      display: -webkit-box;
    }
  }
`;

export default AboutAuthorSummaryStyle;
