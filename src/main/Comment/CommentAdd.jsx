import React, { Component } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import { LaMaSColours } from '../../utils/colourPalettes';
import './CommentAdd.css';


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
            <Form id="add-comment">
                <Input
                    onChange={ (event) => this.setState({ value: event.target.value }) }
                    name="comment"
                    value={ this.state.value }
                    fluid
                    placeholder={ t('comment.input') }
                />
                <Button
                    style={ { marginTop: '5px' } }
                    content={ t('comment.submit') }
                    icon="chat"
                    color={ LaMaSColours.dominant }
                    name="save"
                    fluid
                    size="large"
                    onClick={ this.saveMessage }
                />
            </Form>
        );
    }
}


export default CommentAdd;
