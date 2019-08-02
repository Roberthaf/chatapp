import React from 'react';
import './ChatMessage.css';

export default ({ mid, name, date, message, editMessage, edited, currentUser }) =>
  <li className="Clearfix">
    <div className={ currentUser===name ? "Message-data" : "Message-data Align-right"}>
      <span>{date}</span> 
      <span>{name}</span>
    </div>
    <div className={ currentUser===name ? "Message My-message" : "Message Others-message Float-right "}
      onClick={() => editMessage({mid, name, date, message})}
    >
      { message }
      {/* <span>Edit</span> */}
    </div>
    
  </li>