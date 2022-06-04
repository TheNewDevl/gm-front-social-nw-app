import { useContext, useRef } from 'react'
import { PostsContext } from '../context/PostsContext'
import useSecureAxios from '../../utils/hooks/useSecureAxios'

//get posts with pagination with uploading offset while scrolling the page
const useLoadPosts = (id) => {
  const { setNoContent, setData, setError, setIsLoading } =
    useContext(PostsContext)

  const queryRefs = useRef({
    limit: 10,
    offset: 0,
    count: 0,
  })
  const secureAxios = useSecureAxios()

  const loadPosts = async () => {
    // Used to filter request by user
    const userFilter = id ? `&user=${id}` : ''
    const uri = `posts/?limit=${queryRefs.current.limit}&offset=${queryRefs.current.offset}${userFilter}`
    //prevent bad request using the count query
    if (
      queryRefs.current.offset > 0 &&
      queryRefs.current.offset >= queryRefs.current.count
    ) {
      return
    }
    if (
      queryRefs.current.offset > 0 &&
      queryRefs.current.count - queryRefs.current.offset <
        queryRefs.current.limit
    ) {
      queryRefs.current.limit =
        queryRefs.current.count - queryRefs.current.offset
    }
    try {
      setIsLoading(true)
      const res = await secureAxios.get(uri)
      setData((data) => [...data, ...res.data[0]])
      if (res.data[0].length === 0) {
        setNoContent(true)
      }
      queryRefs.current.count = res.data[1]
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message)
      } else if (error.request) {
        setError('Pas de réponse du serveur')
      } else {
        setError(error.message)
        console.log(error)
      }
    } finally {
      setIsLoading(false)
      queryRefs.current.offset += queryRefs.current.limit
    }
  }
  return loadPosts
}

export default useLoadPosts
