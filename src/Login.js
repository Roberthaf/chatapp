import React from 'react';
import './Login.css';


// ATH SETJA TEST FYRIR LOGIN NAFN
export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: ''
        };
    };
    render(){
        return(
            <div className="loginContainer">

            </div>
        )
    }
}