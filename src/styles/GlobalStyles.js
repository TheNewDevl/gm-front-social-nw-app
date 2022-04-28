import { createGlobalStyle } from 'styled-components'
import { colors } from './colors'
const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
        box-sizing: border-box;
        color: #fff
    }
 
    body {
        margin: 0;
        padding:0;
        background-color: ${colors.primary};
    }
`
export default GlobalStyle
