import React, { useEffect, useState } from 'react'

import UsersList from '../components/UsersList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from './../../shared/components/UIElements/LoadingSpinner'

const Users = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [loadedUsers, setLoadedUsers] = useState()

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:5000/api/v1/users')
        const responseData = await response.json()

        if (!response.ok) {
          throw new Error(responseData.message)
        }

        setLoadedUsers(responseData.data.data)
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
      }
      setIsLoading(false)

    }
    sendRequest()
  }, [])

  const errorHandler = () => {
    setError(null)
  }
  // const USERS = [
  //   {
  //     id: 'u1',
  //     name: 'Max Schwarz',
  //     image:
  //       'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  //     places: 3
  //   }
  // ];

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <div className="center">
        <LoadingSpinner />
      </div>}

      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
      
    </React.Fragment>
    )
}

export default Users
