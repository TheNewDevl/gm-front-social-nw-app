import {
  Button,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useContext } from 'react'
import { RequestsContext } from '../../utils/context/RequestsContext'

function CreateComment({ handleSubmit, input, setInput, textError }) {
  const { isLoading } = useContext(RequestsContext)

  return (
    <>
      <CardContent>
        <TextField
          className="standard-multiline-static"
          name="text"
          aria-label="saisie du contenu textuel"
          label="Réagissez à cette publication ici"
          required
          fullWidth
          minRows={2}
          maxRows={5}
          multiline
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          error={textError ? true : false}
        />
        <Typography component="span" variant="body2" color="error.light">
          {textError}
        </Typography>
      </CardContent>

      <Stack direction="row" justifyContent="flex-end">
        <Button
          onClick={handleSubmit}
          sx={{ mr: '1.5em', mb: '1em' }}
          type="submit"
        >
          {isLoading ? (
            <CircularProgress size={'1.7em'} />
          ) : (
            <>
              Publier <SendIcon sx={{ ml: '1em' }} />
            </>
          )}
        </Button>
      </Stack>
    </>
  )
}

export default CreateComment
