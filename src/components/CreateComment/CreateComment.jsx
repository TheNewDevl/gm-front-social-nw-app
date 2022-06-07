import { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../utils/context/AlertContext'
import { isNotEmpty } from 'class-validator'
import CommentForm from '../Comments/CommentForm'
import { RequestsContext } from '../../utils/context/RequestsContext'

function CreateComment({ post, dataComment, setDataComment }) {
  const { setAlertStates } = useContext(AlertContext)
  const [input, setInput] = useState()
  const [error, setError] = useState('')
  const {
    requestData,
    requestError,
    setRequestError,
    makeRequest,
    setRequestData,
  } = useContext(RequestsContext)

  useEffect(() => {
    //will update comments state array to render the new comment
    const updateDom = (newComment) => {
      const oldArray = [...dataComment]
      oldArray.push(newComment)
      setDataComment(oldArray)
      post.commentsCount += 1
    }

    if (requestData?.newComment) {
      updateDom(requestData.newComment)
    }

    return () => setRequestData('')
  }, [requestData, setRequestData, dataComment, post, setDataComment])

  //catch request errors and use it
  useEffect(() => {
    requestError && setError(requestError)
    return () => setRequestError('')
  }, [requestError, setRequestError])

  const validation = (input) => {
    if (!input || !isNotEmpty(input)) {
      setError('Votre commentaire ne peut pas être vide')
      throw new Error('Votre commentaire ne peut pas être vide')
    } else {
      setError('')
    }
  }

  //post Request
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      validation(input)

      const uri = 'comment'
      const method = 'post'
      const data = { postId: post.id, text: input }
      await makeRequest(method, uri, data)
      setInput('')
      setAlertStates({ open: true, type: 'success', message: 'Enregistré !' })
    } catch (err) {
      setAlertStates({ open: true, type: 'error', message: `${err}` })
    }
  }

  return (
    <>
      <CommentForm
        handleSubmit={handleSubmit}
        input={input}
        setInput={setInput}
        textError={error}
      />
    </>
  )
}

export default CreateComment
