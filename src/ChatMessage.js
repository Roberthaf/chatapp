import React from 'react';
import './ChatMessage.css';

export default ({ mid, name, date, message, editMessage, edited, currentUser }) =>
  <li className="clearfix">
    <div className={ currentUser===name ? "messageData" : "messageData align-right"}>
      <span>{date}</span> 
      <span>{name}</span>
    </div>
    <div className={ currentUser===name ? "message myMessage" : "message otherMessage float-right "}
      onClick={() => editMessage({mid, name, date, message})}
    >
      { message }
    </div>
    <span>Edit</span>
  </li>