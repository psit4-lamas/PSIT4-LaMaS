import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UploadMediaPage from '../pages/UploadMediaPage';
import DisplayVideo from './DisplayVideo';
import './LectureBodyContent.css';
import CommentShow from '../Comment/CommentShow';
import CommentAdd from '../Comment/CommentAdd';
import { Button, Comment, Popup } from 'semantic-ui-react';


class LectureBodyContent extends Component {
    state = { isOpen: false };

    handleOpen = () => {
        this.setState({ isOpen: true });
    };

    handleClose = () => {
        this.setState({ isOpen: false });
        clearTimeout(this.timeout);
    };

    renderComments() {
        let { comments } = this.props;
        return (
            <Popup
                trigger={ <Button content="comments" icon="chat" color="pink" fluid size="large"/> }
                content={
                    <div>
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
                    </div>
                }
                on="click"
                open={ this.state.isOpen }
                onClose={ this.handleClose }
                onOpen={ this.handleOpen }
                position="top left"
                size="large"
            />
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
                    { videoUrl ? <DisplayVideo key={ videoUrl } nameOnStorage={ nameOnStorage } videoUrl={ videoUrl }/> : '' }
                    { this.renderComments() }
                    <UploadMediaPage t={ t } editMode={ false } subject={ subject } lecture={ lecture } onSelectVideoClick={ onSelectVideoClick }
                                     onSelectFileClick={ onSelectFileClick }/>
                </div>
            </>
        );
    }
}


LectureBodyContent.propTypes = {
    // NOSONAR
    lectureTitle: PropTypes.string.isRequired,
    lecture: PropTypes.object.isRequired,
};

export { LectureBodyContent };
export default LectureBodyContent;
