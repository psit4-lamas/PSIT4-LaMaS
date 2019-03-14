import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import {logIn} from '../actions';
import {Button, Form, Input, Segment} from 'semantic-ui-react';

const FormField = Form.Field;


class UserLoginForm extends Component {
    onSubmit = (email, password) => {
        this.props.logIn(email, password);
    };

    render() {
        return (
            <div>
                <LoginFormComponent onSubmit={this.onSubmit}/>
            </div>
        );
    }
}


const LoginFormComponent = ({onSubmit}) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
        <Form size="large" onSubmit={() => onSubmit(email, password)}>
            <Segment stacked>
                <FormField>
                    <Input fluid icon="user" iconPosition="left" name={'email'} placeholder="e-mail address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </FormField>
                <FormField>
                    <Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        name={'password'}
                        placeholder="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormField>

                <Button type="submit" color="pink" fluid size="large">
                    Login
                </Button>
            </Segment>
        </Form>
    );
};

const mapStateToProps = (state) => ( {} );

const mapDispatchToProps = {
    logIn,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserLoginForm);
