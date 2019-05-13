import React, { Component } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import { LaMaSColours } from '../../utils/colourPalettes';
import './CommentAdd.css';


class CommentAdd extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = { value: '' };
    }

    saveMessage = (comment, subject_id) => {
        this.props.onCommentSubmit(comment, subject_id);
        this.setState({ value: '' });
    };

    render() {
        const { value } = this.state;
        const { t, subject_id } = this.props;
        return (
            <Form id="add-comment" onSubmit={ () => this.saveMessage(value, subject_id) }>
                <Input
                    onChange={ (event) => this.setState({ value: event.target.value }) }
                    name="comment"
                    value={ value }
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
                />
            </Form>
        );
    }
}


export default CommentAdd;
