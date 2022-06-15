import { Box } from '@mui/material'

const Main = ({ children }) => {
  return (
    <Box component="main" margin="auto" padding="1em" marginBottom="50px">
      {children}
    </Box>
  )
}

export default Main
