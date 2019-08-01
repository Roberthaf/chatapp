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
            <div className="Login-container">
                <div className="Login-form">
                <form 
                    onSubmit={(e) => {
                        e.preventDefault()
                        this.props.handleLogin(true, this.state.name)
                    }}>
                    <h4>Please Enter your Name</h4>
                    <input
                        id="loginInput"
                        type="text"
                        placeholder={'Enter your name'}
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                    >
                    
                    </input>
                    <input type="submit" value={'Login'} className="Login-Botton"/>
                </form>
                </div>
            </div>
        )
    }
}