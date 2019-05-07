import React, { Component } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';


class CommentAdd extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { value: '' };
    }

    saveMessage = () => {
        this.props.saveMessage(this.state.value);
        console.log(this.state.value);
        this.setState({ value: '' });
    };

    render() {
        return (
            <Form>
                <Input onChange={ (event) => this.setState({ value: event.target.value }) } value={ this.state.value }/>
                <Button content="add comment" icon="chat" color="pink" fluid size="large" onClick={ this.saveMessage }/>
            </Form>
        );
    }
}


export default CommentAdd;
