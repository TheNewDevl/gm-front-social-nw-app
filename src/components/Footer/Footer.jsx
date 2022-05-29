import React, { useContext, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import { DarkModeContext } from '../../utils/context/DarkModeContex'
import { useTheme } from '@mui/material'
import BarContainer from '../../Layout/BarContainer'

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 70,
  height: 30,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(35px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="2 0 20 21"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#dce2e7',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 28,
    height: 28,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#dce2e7',
    borderRadius: 20 / 2,
  },
}))

function Footer() {
  const [isChecked, setIsChecked] = useState(false)
  const { setDarkMode } = useContext(DarkModeContext)
  const theme = useTheme()

  //footer actual time
  const [date, setDate] = useState('')
  setInterval(() => {
    setDate(new Date().toLocaleTimeString())
  }, 1000)

  // set dark mode state depending on the toggle value
  useEffect(() => {
    isChecked ? setDarkMode('dark') : setDarkMode('light')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked])

  return (
    <Box
      style={{
        background: theme.footerGradient,
      }}
      component="footer"
      width="100vw"
      boxShadow={theme.footerShadow}
      bottom="0"
      left="0"
      position="fixed"
    >
      <BarContainer>
        <Typography fontWeight="bold" color="#fff" component="p">
          {date}
        </Typography>

        <FormGroup>
          <FormControlLabel
            label="Theme"
            aria-label="Switch light or dark mode theme"
            sx={{ m: '5px 0', color: '#fff' }}
            control={
              <MaterialUISwitch
                onChange={() => setIsChecked(!isChecked)}
                sx={{ m: 0.5 }}
                checked={isChecked}
              />
            }
          />
        </FormGroup>
      </BarContainer>
    </Box>
  )
}

export default Footer
