import { createTheme } from '@mui/material'
import { useContext } from 'react'
import { DarkModeContext } from '../utils/context/DarkModeContex'

export const Themes = {
  Context() {
    const { mode } = useContext(DarkModeContext)
    return mode
  },

  customTheme() {
    const mode = this.Context()
    const lightTheme = createTheme({
      palette: {
        mode,
        ...(mode === 'light'
          ? {
              /** PALETTE VALUES FOR THE DARK MODE  */
              primary: {
                main: '#0d47a1',
              },
              secondary: {
                main: '#f50057',
              },
              background: {
                default: '#e1f5fe',
                paper: '#b3e5fc',
              },
              divider: '#949090',
            }
          : {
              /** PALETTE VALUES FOR THE DARK MODE  */
              primary: {
                main: '#5893df',
              },
              secondary: {
                main: '#2ec5d3',
              },
              background: {
                default: '#192231',
                paper: '#24344d',
              },
            }),
      },
      shape: {
        borderRadius: 20,
      },
      footerShadow:
        '0px -2px 4px -1px rgb(0 0 0 / 20%),0px -4px 5px 0px rgb(0 0 0 / 14%), 0px -1px 10px 0px rgb(0 0 0 / 12%)',
      footerGradient:
        mode === 'light' &&
        'linear-gradient(344deg, rgba(97,140,208,1) 23%, rgba(179,229,252,1) 100%)',
      components: {
        MuiAppBar: {
          styleOverrides: {
            root: {
              background:
                mode === 'light' &&
                'linear-gradient(220deg, rgba(97,140,208,1) 23%, rgba(179,229,252,1) 100%)',
              color: '#fff',
            },
          },
        },
      },
      sizes: {
        maxWidthPage: '1200px',
      },
      headerTabsHover: {
        '&:hover': {
          transition: 'all 0.3s ease-in-out',
          transform: 'scale(1.1)',
          textDecoration: 'underline',
        },
      },
    })
    return lightTheme
  },
}
