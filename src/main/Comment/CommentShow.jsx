import React, { Component } from 'react';
import { Comment, Icon } from 'semantic-ui-react';


class CommentShow extends Component {
    render() {
        return (
            <Comment>
                <Comment.Content>
                    <Comment.Author>
                        <Icon name="chess rook"/>
                        { this.props.user }
                    </Comment.Author>
                    <Comment.Metadata>
                        <div>{ this.props.timestamp }</div>
                    </Comment.Metadata>
                    <Comment.Text>{ this.props.message }</Comment.Text>
                </Comment.Content>
            </Comment>
        );
    }
}


export default CommentShow;
