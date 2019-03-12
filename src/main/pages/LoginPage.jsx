import React, { Component } from 'react';
import UserLoginForm from '../ComponentLogin/UserLoginForm';
import '.LoginPage.css';


class LoginPage extends Component {

    // TODO: improve Login page UI
    render() {

        return (
            <div>
                <p>You are not logged in!</p>

                <UserLoginForm/>
            </div>
        );
    }
}


export default LoginPage;
