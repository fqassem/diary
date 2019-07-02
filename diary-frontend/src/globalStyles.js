import { createGlobalStyle } from "styled-components";
import { normalize } from 'styled-normalize';

export default createGlobalStyle`
  ${normalize}

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
  }
`;
