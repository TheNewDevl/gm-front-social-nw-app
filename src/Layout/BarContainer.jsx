import { useTheme } from '@mui/material'
import { Box } from '@mui/system'

export default function BarContainer({ children }) {
  const theme = useTheme()
  return (
    <Box
      m="auto"
      p="0 10px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      maxWidth={theme.sizes.maxWidthPage}
    >
      {children}
    </Box>
  )
}
