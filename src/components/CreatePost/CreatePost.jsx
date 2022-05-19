import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import React, { useContext, useState, useEffect } from 'react'
import {
  AlertContext,
  PostsContext,
  UserContext,
} from '../../utils/context/context'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import './CreatePost.scss'
import PostForm from '../PostForm/PostForm'

function CreatePost() {
  const { user } = useContext(UserContext)
  const { setAlertStates } = useContext(AlertContext)

  const { data, setData } = useContext(PostsContext)

  const [inputs, setInputs] = useState({
    text: '',
    file: '',
    urlForPreview: null,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  //Accordion state
  const [expanded, setExpanded] = useState(false)
  useEffect(() => {
    if (!expanded)
      return () =>
        setInputs({
          text: '',
          file: '',
          urlForPreview: null,
        })
  }, [expanded])

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  //will update posts data array to render the post without any request
  const updateData = (post) => {
    const oldArray = [...data]
    oldArray.unshift(post)
    setData(oldArray)
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    try {
      e.preventDefault()
      const data = new FormData()
      data.append('file', inputs.file)
      data.append('text', inputs.text)

      const response = await fetch('http://localhost:3000/api/posts/upload', {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      })
      const parsedRespose = await response.json()
      if (response.ok) {
        updateData(parsedRespose.post)
        setInputs({
          text: '',
          file: '',
          urlForPreview: null,
        })
        setAlertStates({
          open: true,
          type: 'success',
          message: 'Publication enregistrée !',
        })
      } else {
        setAlertStates({
          open: true,
          type: 'error',
          message: `${parsedRespose.message}`,
        })
      }
    } catch (error) {
      console.log(error)
      setError(error.message)
      setAlertStates({
        open: true,
        type: 'error',
        message: { error },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Accordion
        className="accordion"
        expanded={expanded === 'panel1'}
        onChange={handleChangeAccordion('panel1')}
      >
        <AccordionSummary
          className="accordion__summary"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Button className="accordion__btn" fullWidth variant="outlined">
            Créer une publication
          </Button>
        </AccordionSummary>

        <AccordionDetails className="accordion__content">
          <PostForm
            inputs={inputs}
            setInputs={setInputs}
            error={error}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default CreatePost
