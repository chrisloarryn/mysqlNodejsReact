import React, { useEffect, useState } from 'react'

import UsersList from '../components/UsersList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from './../../shared/components/UIElements/LoadingSpinner'
import {useHttpClient} from '../../shared/hooks/http-hook'

const Users = () => {
  const {isLoading, error, sendRequest, cleanError} = useHttpClient()
  const [loadedUsers, setLoadedUsers] = useState()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/v1/users')
        for (const user of responseData.data.data) {
          user.image = 'https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png'
        }
        console.log(responseData)
        setLoadedUsers(responseData.data.data)
      } catch (err) {
        cleanError()
      }
    }
    fetchUsers()
  }, [sendRequest])

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={cleanError} />
      {isLoading && <div className="center">
        <LoadingSpinner />
      </div>}

      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
      
    </React.Fragment>
    )
}

export default Users
