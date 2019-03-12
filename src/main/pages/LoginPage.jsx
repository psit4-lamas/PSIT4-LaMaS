import React, { Component } from 'react';
import UserLoginForm from '../ComponentLogin/UserLoginForm';
import './LoginPage.css';


class LoginPage extends Component {

    // TODO: improve Login page UI
    render() {

        return (
            <React.Fragment>
                <p>You are not logged in!</p>

                <UserLoginForm/>
            </React.Fragment>
        );
    }
}


export default LoginPage;
