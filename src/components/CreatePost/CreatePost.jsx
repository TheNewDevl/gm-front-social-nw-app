import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import React, { useContext, useState, useEffect } from 'react'
import { AlertContext } from '../../utils/context/AlertContext'
import { PostsContext } from '../../utils/context/PostsContext'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PostForm from '../PostForm/PostForm'
import { postValidation } from '../../utils/validators'
import useSecureAxios from '../../utils/hooks/useSecureAxios'

function CreatePost() {
  const { setAlertStates } = useContext(AlertContext)
  const { data, setData } = useContext(PostsContext)
  const [inputs, setInputs] = useState({
    text: '',
    file: '',
    urlForPreview: null,
  })
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const secureAxios = useSecureAxios()

  //Accordion state
  const [expanded, setExpanded] = useState(false)
  const handleExpandAccordion = () => setExpanded(!expanded)

  const updateData = (post) => {
    const oldArray = [...data]
    oldArray.unshift(post)
    setData(oldArray)
  }

  const validation = (inputs) => {
    const formError = postValidation(inputs)
    setError(formError.text)
    if (formError.text) {
      throw new Error(formError.text)
    }
  }

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true)
      e.preventDefault()

      validation(inputs)

      const data = new FormData()
      data.append('file', inputs.file)
      data.append('text', inputs.text)

      const url = 'posts/upload'
      const response = await secureAxios.post(url, data)

      setAlertStates({
        open: true,
        type: 'success',
        message: 'Publication enregistrée !',
      })
      setInputs({ text: '', file: '', urlForPreview: null })
      setExpanded(false)
      updateData(response.data.post)
    } catch (err) {
      if (err?.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err?.request) {
        setError('Pas de réponse du serveur')
      } else {
        setError(err.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  //catch request errors and use it
  useEffect(() => {
    if (error) {
      setAlertStates({ open: true, type: 'error', message: `${error}` })
    }
  }, [error])

  return (
    <>
      <Accordion sx={{ mb: '2em' }} expanded={expanded}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Button
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              zIndex: '100',
            }}
            role="none"
            tabIndex={null}
            component="span"
            variant="outlined"
            onClick={handleExpandAccordion}
          >
            Créer une publication
          </Button>
        </AccordionSummary>

        <AccordionDetails sx={{ mr: '24px' }}>
          <PostForm
            inputs={inputs}
            setInputs={setInputs}
            error={error}
            handleSubmit={handleSubmit}
            loading={isLoading}
          />
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default CreatePost
