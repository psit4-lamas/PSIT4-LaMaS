import React, {Component} from 'react';
import UserLoginForm from '../ComponentLogin/UserLoginForm';
import './LoginPage.css';
import {Grid, Header, Image} from 'semantic-ui-react';
import logo_round from '../../images/lama_round_draft.png'
import {withNamespaces} from 'react-i18next';


class LoginPage extends Component {
    // TODO: improve Login page UI
    render() {
        const {t} = this.props;
        return (
            <Grid textAlign="center" style={ {height: '100%'} } verticalAlign="middle">
                <Grid.Column style={ {maxWidth: 450} }>
                    <Header as="h2" color="pink" textAlign="center">
                        <Image
                            src={ logo_round }/>{ ' ' }
                        { t('login.message') }
                    </Header>
                    <React.Fragment>
                        <UserLoginForm/>
                    </React.Fragment>
                </Grid.Column>
            </Grid>
        );
    }
}


export default withNamespaces()(LoginPage);