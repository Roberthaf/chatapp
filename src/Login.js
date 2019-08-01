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
                <p className="welcomeText">Welcome to ChatApp</p>
                <form className="login-form" 
                    onSubmit={(e) => {
                        e.preventDefault()
                        this.props.handleLogin(true, this.state.name)
                    }}>
                    <label>Please Enter your Name</label>
                    <input
                        id="loginInput"
                        type="text"
                        placeholder={'Enter your name'}
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                    >
                    
                    </input>
                    <input type="submit" value={'Login'} className="LoginBotton"/>
                </form>
            </div>
        )
    }
}