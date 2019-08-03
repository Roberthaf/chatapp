import React from 'react';
import './ChatMessage.css';

export default ({ mid, name, date, message, editMessage, edited, currentUser,action }) =>
<li className="Clearfix">  
  {action === ("connection") ?  
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
        <span className="Message-data-name">{name}</span>
        <span className="Message-data-time">{date}</span>   
        </div>
        <div 
          className={ currentUser===name ? "Message My-message" : "Message Others-message Float-right "}
          
        >
        <span>{message}</span>
        <span className="Message-data-edited-message">{edited}</span>
        { 
          currentUser===name ? 
          <span 
          className="Message-data-edit" 
          onClick={() => editMessage({mid, name, date, message})} 
        >
          Edit
          </span> : null
        }
        </div>
      </div>
      : 
      null 
    }
</li>