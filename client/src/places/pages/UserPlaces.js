import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import TicketList from './../../user/components/TicketList';
import ErrorModal from './../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from './../../shared/components/UIElements/LoadingSpinner'

import {useHttpClient} from './../../shared/hooks/http-hook'
const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  }
];

const UserPlaces = () => {

  const {isLoading, error, sendRequest, cleanError} = useHttpClient()
  const [loadedTickets, setLoadedTickets] = useState()

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/v1/tickets')

        for (const user of responseData.data.data) {
          user.image = 'https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png'
        }
        setLoadedTickets(responseData.data.data)
      } catch (err) {
        cleanError()
      }
    }
    fetchTickets()
  }, [sendRequest])

  // activate for querying to userTickets
  // const userId = useParams().userId;
  console.log(loadedTickets)

  // const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
  return (
      <React.Fragment>
        <ErrorModal error={error} onClear={cleanError} />
        {isLoading && <div className="center">
          <LoadingSpinner />
        </div>}

        {!isLoading && loadedTickets && <TicketList items={loadedTickets} />}

      </React.Fragment>
      )
  // <UserList items={loadedPlaces} />;
};

export default UserPlaces;
