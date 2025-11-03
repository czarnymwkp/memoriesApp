// src/app/GlobalStyle.ts
import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  *,*::before,*::after{box-sizing:border-box}
  html,body,#root{height:100%}
  body{
    margin:0;
    background:${({ theme }) => theme.colors.bg};
    color:${({ theme }) => theme.colors.text};
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  }
  a{color:inherit;text-decoration:none}
  button{cursor:pointer}
`
