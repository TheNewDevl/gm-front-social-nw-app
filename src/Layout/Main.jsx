import { Box } from '@mui/material'
import { useTheme } from '@mui/material'

const Main = ({ children }) => {
  const theme = useTheme()
  return (
    <Box
      component="main"
      margin="auto"
      padding="1em"
      maxWidth={theme.sizes.maxWidthPage}
      marginBottom="50px"
    >
      {children}
    </Box>
  )
}

export default Main
