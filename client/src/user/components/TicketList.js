import React from 'react';

import TicketItem from './TicketItem';
import Card from '../../shared/components/UIElements/Card';
import './UsersList.css';

const TicketList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map(user => (
        <TicketItem
          key={user.id}
          id={user.id}
          image={user.image}
          author={user.author}
          title={user.title}
          ticketCount={user.cant}
          ticket_pedido={user.ticket_pedido}
        />
      ))}
    </ul>
  );
};

export default TicketList;
