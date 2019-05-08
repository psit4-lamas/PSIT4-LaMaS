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
        const { t } = this.props;
        return (
            <Form>
                <Input onChange={ (event) => this.setState({ value: event.target.value }) } value={ this.state.value } fluid placeholder={ t('comment.input') } name="comment"/>
                <Button content={ t('comment.submit') } icon="chat" color="pink" name="save" fluid size="large" onClick={ this.saveMessage }/>
            </Form>
        );
    }
}


export default CommentAdd;
