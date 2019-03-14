import React, {Component} from 'react';
import UserLoginForm from '../ComponentLogin/UserLoginForm';
import './LoginPage.css';
import {Grid, Header, Image} from 'semantic-ui-react';


class LoginPage extends Component {
    // TODO: improve Login page UI
    render() {
        return (
            <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as="h2" color="pink" textAlign="center">
                        <Image
                            src="https://firebasestorage.googleapis.com/v0/b/fir-and-react-55a5a.appspot.com/o/images%2Flama_round_draft.png?alt=media&token=c57d37c7-efc2-4a06-99d2-25d5bf2ed443"/>{' '}
                        Log-in to your account
                    </Header>
                    <React.Fragment>
                        <UserLoginForm/>
                    </React.Fragment>
                </Grid.Column>
            </Grid>
        );
    }
}


export default LoginPage;
