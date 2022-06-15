import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'

function PopUp({
  passiveAction,
  passiveBtnText = 'Ok',
  popUpMsg,
  loading,
  activeAction,
}) {
  const theme = useTheme()

  return (
    <Box
      onClick={passiveAction}
      bgcolor="rgb(0, 0, 0, 0.4)"
      position="fixed"
      width="100vw"
      height="100vh"
      top="0"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        onClick={(e) => {
          e.stopPropagation()
        }}
        bgcolor={theme.palette.background.paper}
        borderRadius="20px"
        width="80%"
        padding="2em"
      >
        <Typography
          component="p"
          fontSize="1.2em"
          textAlign="center"
          fontWeight="bold"
        >
          {popUpMsg}
        </Typography>
        <Stack
          flexDirection="row"
          justifyContent="center"
          flexWrap="wrap"
          gap="20px"
        >
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={passiveAction}
          >
            {passiveBtnText}
          </Button>

          {activeAction && (
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading ? true : false}
              onClick={activeAction}
            >
              {loading ? (
                <CircularProgress size={'1.7em'} />
              ) : (
                'Supprimer définitivement'
              )}
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  )
}
export default PopUp
