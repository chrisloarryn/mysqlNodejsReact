import { useState, useCallback, useRef, useEffect } from 'react'

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const activeHttpRequests = useRef([])
  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true)
      const httpAbortCtrl = new AbortController()
      activeHttpRequests.current.push()
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal
        })
        const responseData = await response.json()
        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        )
        if (!response.ok) throw new Error(responseData.message)

        setIsLoading(false)

        return responseData
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
        throw err
      }
    }, []
  )

  const cleanError = () => {
    setError(null)
  }

  useEffect(() => {
    return () => {
      //bactiveHttpRequests.current.forEach(abortCtrl => abortCtrl.abortCtrl())
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
    }
  }, [])

  return { isLoading, error, sendRequest, cleanError }
}
