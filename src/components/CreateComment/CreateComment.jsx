import { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../utils/context/AlertContext'
import { isNotEmpty } from 'class-validator'
import CommentForm from '../Comments/CommentForm'
import useSecureAxios from '../../utils/hooks/useSecureAxios'

function CreateComment({ post, dataComment, setDataComment }) {
  const { setAlertStates } = useContext(AlertContext)
  const [input, setInput] = useState()
  const [error, setError] = useState('')
  const secureAxios = useSecureAxios()

  const validation = (input) => {
    if (!input || !isNotEmpty(input)) {
      setError('Votre commentaire ne peut pas être vide')
      throw new Error('Votre commentaire ne peut pas être vide')
    } else {
      setError('')
    }
  }

  //will update comments state array to render the new comment
  const updateDom = (newComment) => {
    const oldArray = [...dataComment]
    oldArray.push(newComment)
    setDataComment(oldArray)
    post.commentsCount += 1
  }

  //post Request
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      validation(input)

      const uri = 'comment'
      const data = { postId: post.id, text: input }
      const comment = await secureAxios.post(uri, data)

      setAlertStates({ open: true, type: 'success', message: 'Enregistré !' })
      updateDom(comment.data)
      setInput('')
    } catch (err) {
      if (err?.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err?.request) {
        setError('Pas de réponse du serveur')
      } else {
        setError(err.message)
      }
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
