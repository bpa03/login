import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --font-family: 'Roboto', sans-serif;
    --font-size: 18px;
    --font-size-responsibe: 16px;
    --toastify-font-family: var(--font-family);
    --toastify-text-color-light: rgb(33, 37, 41);
    --toastify-color-error: rgba(255, 0, 0, .5);
  }

  html {
    box-sizing: border-box;
    font-family: var(--font-family);
    font-size: var(--font-size-responsibe);

    @media only screen and (min-width: 768px) {
      font-size: var(--font-size);
    }
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
  
  * {
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family);
    font-weight: bold;
  }

  img {
    width: 100%;
    max-width: 100%;
  }

  input, button {
    background: transparent;
    outline: none;
    border: none;
    font-family: var(--font-family);
  }

`;

export default GlobalStyles;
