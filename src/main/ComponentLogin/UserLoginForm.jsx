import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logIn} from '../actions';
import {Button, Form, Input, Segment} from 'semantic-ui-react';
import {withNamespaces} from 'react-i18next';

const FormField = Form.Field;


class UserLoginForm extends Component {
    onSubmit = (email, password) => {
        this.props.logIn(email, password);
    };

    render() {
        const {t} = this.props;
        return (
            <div>
                <Form size="large" onSubmit={ () => this.onSubmit(this.state.email, this.state.password) }>
                    <Segment stacked>
                        <FormField>
                            <Input fluid icon="user" iconPosition="left" name={ 'email' } placeholder={ t('login.email') }
                                   onChange={ (e) => this.setState({email: e.target.value}) }/>
                        </FormField>
                        <FormField>
                            <Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                name={ 'password' }
                                placeholder={ t('login.password') }
                                type="password"
                                onChange={ (e) => this.setState({password: e.target.value}) }
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


const mapStateToProps = (state) => ( {} );

const mapDispatchToProps = {
    logIn,
};

export default withNamespaces()(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(UserLoginForm),
);
