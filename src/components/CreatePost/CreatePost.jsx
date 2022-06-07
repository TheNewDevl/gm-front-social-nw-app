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
import './CreatePost.scss'
import PostForm from '../PostForm/PostForm'
import { postValidation } from '../../utils/validators'
import { RequestsContext } from '../../utils/context/RequestsContext'

function CreatePost() {
  const { setAlertStates } = useContext(AlertContext)
  const { data, setData } = useContext(PostsContext)
  const [inputs, setInputs] = useState({
    text: '',
    file: '',
    urlForPreview: null,
  })
  const [error, setError] = useState()
  //Accordion state
  const [expanded, setExpanded] = useState(false)
  const {
    requestData,
    requestError,
    setRequestError,
    isLoading,
    makeRequest,
    setRequestData,
  } = useContext(RequestsContext)

  //if get a new post from request, updateDom and clean context
  useEffect(() => {
    const updateData = (post) => {
      const oldArray = [...data]
      oldArray.unshift(post)
      setData(oldArray)
    }
    requestData?.newPost && updateData(requestData.newPost)
    return () => setRequestData('')
  }, [requestData, setRequestData, data, setData])

  //catch request errors and use it
  useEffect(() => {
    if (expanded && requestError) {
      setError(requestError)
    }
    return () => {
      setRequestError(undefined)
      setError(requestError)
    }
  }, [expanded, requestError, setRequestError])

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
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
      e.preventDefault()

      validation(inputs)

      const data = new FormData()
      data.append('file', inputs.file)
      data.append('text', inputs.text)

      const method = 'post'
      const url = 'posts/upload'
      await makeRequest(method, url, data)

      setInputs({ text: '', file: '', urlForPreview: null })
      setAlertStates({
        open: true,
        type: 'success',
        message: 'Publication enregistrée !',
      })
    } catch (err) {
      setAlertStates({ open: true, type: 'error', message: `${err}` })
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
            loading={isLoading}
          />
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default CreatePost
