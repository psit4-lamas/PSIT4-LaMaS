import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../actions';
import { withNamespaces } from 'react-i18next';
import { Button, Form, Input, Segment } from 'semantic-ui-react';

const FormField = Form.Field;


class UserLoginForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            email: '',
            password: '',
        };
    }

    onSubmit = (email, password) => {
        this.props.logIn(email, password);
    };

    render() {
        const { t } = this.props;
        return (
            <div>
                <Form size="large" onSubmit={ () => this.onSubmit(this.state.email, this.state.password) }>
                    <Segment>
                        <FormField>
                            <Input fluid icon="user" iconPosition="left" name={ 'email' } placeholder={ t('login.email') }
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


const mapStateToProps = () => ( {} );

const mapDispatchToProps = {
    logIn,
};

export { UserLoginForm };
export default withNamespaces()(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(UserLoginForm),
);
