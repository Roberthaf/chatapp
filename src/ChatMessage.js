import React from 'react';
import './ChatMessage.css';

export default ({ mid, name, date, message, editMessage, edited, currentUser, action, deleteMessage }) =>
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
        { edited ? <span className="Message-data-edited-message"> Message edited </span> : null }
        </div>
        <div 
          className={ currentUser===name ? "Message My-message" : "Message Others-message Float-right "}
          
        >
        <span>{message}</span>
       
        { 
          currentUser===name ? 
          <div className="Message-data-editDiv">
          <span 
            className="Message-data-delete" 
            onClick={() => deleteMessage({mid, name, date, message})} 
          >
            <i className="fas fa-times"></i>
          </span> 
          <span 
            className="Message-data-edit" 
            onClick={() => editMessage({mid, name, date, message})} 
          >
          Edit
          </span> 

          </div>: null
        }
        </div>
      </div>
      : 
      null 
    }
</li>