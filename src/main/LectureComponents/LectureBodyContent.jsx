import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchVideo } from '../actions';
import UploadMediaPage from '../pages/UploadMediaPage';
import './LectureBodyContent.css';
import DisplayVideo from './DisplayVideo';


class LectureBodyContent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nameOnStorage: '',
            videoUrl: '',
        };
    }

    componentWillMount() {
        const { lecture } = this.props;
        const nameOnStorage = Object.keys(lecture.videos).length > 0 ? lecture.videos.videos_00.nameOnStorage : '';

        if (!!nameOnStorage) {
            this.props.fetchVideo(nameOnStorage)
                .then(videoUrl => {

                    this.setState({
                        videoUrl: videoUrl,
                    });
                });
        }

        this.setState({
            nameOnStorage: nameOnStorage,
        });
    }

    onSelectVideoClick = (nameOnStorage) => {
        this.props.fetchVideo(nameOnStorage)
            .then(videoUrl => {

                this.setState({
                    nameOnStorage: nameOnStorage,
                    videoUrl: videoUrl,
                });
            });
    };

    render() {
        const { t, subject, lecture, lectureTitle } = this.props;
        let { nameOnStorage, videoUrl } = this.state;

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
                    { !!nameOnStorage && <DisplayVideo nameOnStorage={ nameOnStorage } videoUrl={ videoUrl }/> }
                    <UploadMediaPage t={ t } editMode={ false } subject={ subject } lecture={ lecture }
                                     onSelectVideoClick={ this.onSelectVideoClick }/>
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
    fetchVideo,
};

export { LectureBodyContent };
export default connect(mapStateToProps, mapDispatchToProps)(LectureBodyContent);
