import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UploadMediaPage from '../pages/UploadMediaPage';
import './LectureBodyContent.css';
import DisplayVideo from './DisplayVideo';


class LectureBodyContent extends Component {

    render() {
        const { t, subject, lecture, lectureTitle } = this.props;
        const nameOnStorage = Object.keys(lecture.videos).length > 0 ? lecture.videos.videos_00.nameOnStorage : '';

        return (
            <>
                <h1>
                    { t('baseLayout.lecture') }
                    { lectureTitle }
                    { !!lecture.name ? ` - ${ lecture.name }` : '' }
                </h1>

                <div style={ { marginTop: '25px' } }>
                    <DisplayVideo nameOnStorage={ nameOnStorage }/>
                    <br/>
                    <UploadMediaPage t={ t } editMode={ false } subject={ subject } lecture={ lecture }/>
                </div>
            </>
        );
    }
}


LectureBodyContent.propTypes = {
    lectureTitle: PropTypes.string.isRequired,
    lecture: PropTypes.object.isRequired,
};

export default LectureBodyContent;
