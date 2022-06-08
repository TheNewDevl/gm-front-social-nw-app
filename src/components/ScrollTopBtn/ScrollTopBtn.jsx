import { useEffect, useState } from 'react'
import { Fab } from '@mui/material'
import { Box } from '@mui/system'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

function ScrollTopBtn() {
  const [displayBtn, setdisplayBtn] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = (e) => {
    if (e.target.documentElement.scrollTop > window.innerHeight) {
      setdisplayBtn(true)
    } else {
      setdisplayBtn(false)
    }
  }

  return (
    <Box
      sx={{
        opacity: displayBtn ? 1 : 0,
        transition: ' opacity 300ms ease-in-out',
        position: 'fixed',
        bottom: 60,
        right: 15,
        zIndex: 100,
      }}
    >
      <Fab
        onClick={() => window.scrollTo(0, 0)}
        color="primary"
        aria-label="scroll to the top of the page"
      >
        <ArrowUpwardIcon />
      </Fab>
    </Box>
  )
}

export default ScrollTopBtn
