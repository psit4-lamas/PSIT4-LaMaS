import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UploadMediaPage from '../pages/UploadMediaPage';
import DisplayVideo from './DisplayVideo';
import './LectureBodyContent.css';
import CommentShow from '../Comment/CommentShow';
import CommentAdd from '../Comment/CommentAdd';
import { Comment, Grid, Segment } from 'semantic-ui-react';


class LectureBodyContent extends Component {
    renderComments() {
        let { comments } = this.props;
        return (
            <Segment style={ {
                overflow: 'auto',
                maxHeight: 500,
            } }>
                <Comment.Group>
                    { comments
                      ? Object.keys(comments).map((index) => {
                            return (
                                <CommentShow
                                    key={ index }
                                    message={ comments[index].comment }
                                    user={ comments[index].user_id }
                                    timestamp={ new Date(comments[index].timestamp).toDateString() }
                                />
                            );
                        })
                      : '' }
                </Comment.Group>
                <CommentAdd saveMessage={ this.props.saveComment }/>
            </Segment>
        );
    }

    render() {
        const { t, subject, lecture, lectureTitle, onSelectVideoClick, onSelectFileClick } = this.props;
        let { nameOnStorage, videoUrl } = this.props;

        return (
            <>
                <h1>
                    { t('baseLayout.lecture') }
                    { lectureTitle }
                    { !!lecture.name ? ` - ${ lecture.name }` : '' }
                </h1>

                <div style={ { marginTop: '25px' } }>
                    <Grid divided="vertically">
                        <Grid.Column width={ 9 }>{ videoUrl ? <DisplayVideo key={ videoUrl } nameOnStorage={ nameOnStorage } videoUrl={ videoUrl }/> : '' }</Grid.Column>
                        <Grid.Column width={ 7 }>{ this.renderComments() }</Grid.Column>
                    </Grid>
                    <UploadMediaPage t={ t } editMode={ false } subject={ subject } lecture={ lecture } onSelectVideoClick={ onSelectVideoClick }
                                     onSelectFileClick={ onSelectFileClick }/>
                </div>
            </>
        );
    }
}


LectureBodyContent.propTypes = { // NOSONAR


    lectureTitle: PropTypes.string.isRequired,
    lecture: PropTypes.object.isRequired,
};

export { LectureBodyContent };
export default LectureBodyContent;
