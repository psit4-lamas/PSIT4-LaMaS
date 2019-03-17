import React, { Component } from 'react';


class Comment extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { value: '' };
    }

    render() {
        let { saveMessage } = this.props;

        return (
            <form
                onSubmit={ (event) => {
                    event.preventDefault();
                    saveMessage(this.state.value);
                    this.setState({ value: '' });
                } }
            >
                <input onChange={ (event) => this.setState({ value: event.target.value }) } value={ this.state.value }/>
            </form>
        );
    }
}


export default Comment;
