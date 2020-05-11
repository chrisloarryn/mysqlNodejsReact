import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './TicketItem.css';

const TicketItem = props => {

  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.id}: {props.title ? props.title : '(no data available)'}</h2>
            <h3>
              {props.ticket_pedido ? props.ticket_pedido : ' [no data] '} [ {props.author ? props.author : '(no data available)'} ]
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default TicketItem;
