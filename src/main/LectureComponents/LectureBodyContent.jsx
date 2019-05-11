import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UploadMediaPage from '../pages/UploadMediaPage';
import DisplayVideo from './DisplayVideo';
import './LectureBodyContent.css';


class LectureBodyContent extends Component {
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
                    { videoUrl ? <DisplayVideo key={ videoUrl } nameOnStorage={ nameOnStorage } videoUrl={ videoUrl }/> : '' }

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
