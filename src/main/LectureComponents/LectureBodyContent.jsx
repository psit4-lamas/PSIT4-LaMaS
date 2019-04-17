import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UploadMediaPage from '../pages/UploadMediaPage';
import './LectureBodyContent.css';
import DisplayVideo from './DisplayVideo';
import { fetchFile } from '../actions';


class LectureBodyContent extends Component {

    constructor(props) {
        super(props);
console.log("inital"+this.props.nameOnStorage);
        this.state = {
            nameOnStorage: props.nameOnStorage,
            videoUrl: props.videoUrl,
        };
        this.props.showVideo(this.props.lectureId);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { lecture } = nextProps;
        const nameOnStorage = Object.keys(lecture.videos).length > 0 ? lecture.videos.videos_00.nameOnStorage : '';

                    return {
                        videoUrl: nextProps.videoUrl,
                        nameOnStorage
                    };



    }

    render() {
        const { t, subject, lecture, lectureTitle, onSelectVideoClick, onSelectFileClick } = this.props;
        let { nameOnStorage, videoUrl } = this.props;

        if (!nameOnStorage && Object.keys(lecture.videos).length > 0) {
            nameOnStorage = lecture.videos.videos_00.nameOnStorage;
        } else if (!!nameOnStorage && Object.keys(lecture.videos).length > 0) {
            console.log('Selected video', nameOnStorage);
        } else {
            nameOnStorage = '';
        }
        return (
            <>
                <h1>
                    { t('baseLayout.lecture') }
                    { lectureTitle }
                    { !!lecture.name ? ` - ${ lecture.name }` : '' }
                </h1>

                <div style={ { marginTop: '25px' } }>
                    { !!nameOnStorage && <DisplayVideo key={nameOnStorage} nameOnStorage={ nameOnStorage } videoUrl={ videoUrl }/> }
                    <UploadMediaPage t={ t } editMode={ false } subject={ subject } lecture={ lecture }
                                     onSelectVideoClick={ onSelectVideoClick } onSelectFileClick={ onSelectFileClick }/>
                </div>
            </>
        );
    }
}


LectureBodyContent.propTypes = {
    lectureTitle: PropTypes.string.isRequired,
    lecture: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ( {} );

const mapDispatchToProps = {
    fetchFile,
};

export { LectureBodyContent };
export default connect(mapStateToProps, mapDispatchToProps)(LectureBodyContent);
