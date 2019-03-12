import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../actions';
import { Button, Checkbox, Form, Input } from 'semantic-ui-react';


const FormField = Form.Field;


class UserLoginForm extends Component {

    onSubmit = (email, password) => {
        this.props.logIn(email, password);
    };

    render() {
        return (
            <div>
                <LoginFormComponent onSubmit={ this.onSubmit }/>
            </div>
        );
    }
}


const LoginFormComponent = ({ onSubmit }) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
        <Form onSubmit={ () => onSubmit(email, password) }>
            <FormField>
                <label>Email</label>
                <Input name={ 'email' } placeholder="test@zhaw.ch" value={ email } onChange={ (e) => setEmail(e.target.value) }/>
            </FormField>
            <FormField>
                <label>Password</label>
                <Input name={ 'password' } type={ 'password' } value={ password } onChange={ (e) => setPassword(e.target.value) }/>
            </FormField>
            <FormField>
                <Checkbox label="I agree to the Terms and Conditions"/>
            </FormField>
            <Button type="submit">Submit</Button>
        </Form>
    );
};

const mapStateToProps = (state) => ( {} );

const mapDispatchToProps = {
    logIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginForm);
