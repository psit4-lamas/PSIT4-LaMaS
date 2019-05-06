import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../actions';
import { withNamespaces } from 'react-i18next';
import { Button, Form, Input, Message, Segment } from 'semantic-ui-react';


const FormField = Form.Field;


class UserLoginForm extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            email: '',
            password: '',
            errorMessage: '',
        };
    }

    onSubmit = (email, password) => {
        const response = this.props.logIn(email, password);

        if (response) {
            response
                .catch((err) => {
                    console.log('USER NOT FOUND', err);
                    this.setState({
                        errorMessage: err.message,
                    });
                });
        }
    };

    render() {
        const { email, password, errorMessage } = this.state;
        const { t } = this.props;

        return (
            <div>

                { errorMessage && (
                    <Message
                        id="user-not-found"
                        error
                        style={ { textAlign: 'left' } }
                        header={ t('login.errorHeader') }
                        content={ t('login.errorMessage') }
                    />
                ) }

                <Form size="large" onSubmit={ () => this.onSubmit(email, password) }>
                    <Segment>
                        <FormField>
                            <Input fluid icon="user" iconPosition="left" name={ 'email' }
                                   placeholder={ t('login.email') }
                                   onChange={ (e) => this.setState({ email: e.target.value }) }/>
                        </FormField>
                        <FormField>
                            <Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                name={ 'password' }
                                placeholder={ t('login.password') }
                                type="password"
                                onChange={ (e) => this.setState({ password: e.target.value }) }
                            />
                        </FormField>

                        <Button type="submit" color="pink" fluid size="large">
                            Login
                        </Button>
                    </Segment>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    logIn,
};

export { UserLoginForm };
export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(UserLoginForm));
