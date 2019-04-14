import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UploadMediaPage from '../pages/UploadMediaPage';
import './LectureBodyContent.css';


class LectureBodyContent extends Component {

    render() {
        const { t, lecture, lectureTitle } = this.props;

        return (
            <>
                <h1>
                    { t('baseLayout.lecture') }
                    { lectureTitle }
                    { !!lecture.name ? ` - ${ lecture.name }` : '' }
                </h1>

                <div style={ { marginTop: '25px' } }>
                    <UploadMediaPage t={ t } editMode={ false } lecture={ lecture }/>
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
