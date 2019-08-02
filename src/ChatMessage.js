import React from 'react';
import './ChatMessage.css';

export default ({ mid, name, date, message, editMessage, edited, currentUser,action }) =>
<li className="Clearfix">  
  {console.log(action, message)}
  {action === ("userConnected") ?  
    <div className={"Connection-message"}>
      <span>{name} </span> <br />
      <span>{date } </span>
      <span>{message}</span>
    </div> : null }
    {action === ("userDisconnected") ?  
    <div className={"Connection-message"}>
      <span>{name} </span> <br />
      <span>{date } </span>
      <span>{message}</span>
    </div> : null }
    
   {action === "message" ? 
      <div>
        <div 
          className={ currentUser===name ? "Message-data" : "Message-data Align-right"}
        >
          <span>{date}</span> 
          <span>{name}</span>
        </div>
        <div 
          className={ currentUser===name ? "Message My-message" : "Message Others-message Float-right "}
          onClick={() => editMessage({mid, name, date, message})}
        >
        {message}
        </div>
      </div>
      : 
      null 
    }
</li>