import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Comment, Grid, Segment } from 'semantic-ui-react';
import CommentShow from '../Comment/CommentShow';
import CommentAdd from '../Comment/CommentAdd';
import UploadMediaPage from '../pages/UploadMediaPage';
import DisplayVideo from './DisplayVideo';
import './LectureBodyContent.css';


class LectureBodyContent extends Component {

    renderComments() {
        let { comments, t, subject } = this.props;
        return (
            <Segment id="comment-segment" style={ {
                overflow: 'auto',
                maxHeight: 450,
            } }>
                <Comment.Group>
                    { comments
                      ? Object.keys(comments).map((index) => {
                          const datetime = new Date(comments[index].timestamp);
                            return (
                                <CommentShow
                                    key={ index }
                                    message={ comments[index].comment }
                                    user={ comments[index].user_name }
                                    timestamp={ `${ datetime.toDateString() }, ${ datetime.toLocaleTimeString() }` }

                                />
                            );
                        })
                      : '' }
                <CommentAdd onCommentSubmit={ this.props.onCommentSubmit } t={ t } subject_id={ subject.subject_id }/>
                </Comment.Group>
            </Segment>
        );
    }

    render() {
        const { t, subject, lecture, lectureTitle, onSelectVideoClick, onSelectFileClick } = this.props;
        let { nameOnStorage, videoUrl, isStudent } = this.props;

        return (
            <>
                <h1>
                    { t('baseLayout.lecture') }
                    { lectureTitle }
                    { !!lecture.name ? ` - ${ lecture.name }` : '' }
                </h1>
                <div style={ { marginTop: '25px' } }>
                    <Grid divided="vertically">
                        <Grid.Column floated='left' width={ 10 }>
                            { videoUrl ? (
                                <DisplayVideo
                                    key={ videoUrl }
                                    nameOnStorage={ nameOnStorage }
                                    videoUrl={ videoUrl }
                                />) : '' }
                        </Grid.Column>

                        <Grid.Column floated='right' width={ 6 }>
                            { this.renderComments() }
                        </Grid.Column>
                    </Grid>

                    <UploadMediaPage
                        isStudent={ isStudent }
                        t={ t }
                        editMode={ false }
                        subject={ subject }
                        lecture={ lecture }
                        onSelectVideoClick={ onSelectVideoClick }
                        onSelectFileClick={ onSelectFileClick }
                    />
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
