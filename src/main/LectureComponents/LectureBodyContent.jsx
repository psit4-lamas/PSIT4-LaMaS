import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UploadMediaPage from '../pages/UploadMediaPage';
import './LectureBodyContent.css';
import DisplayVideo from './DisplayVideo';


class LectureBodyContent extends Component {
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
                    <UploadMediaPage t={ t } editMode={ false } subject={ subject } lecture={ lecture } onSelectVideoClick={ onSelectVideoClick }
                                     onSelectFileClick={ onSelectFileClick }/>
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

const mapDispatchToProps = {};

export { LectureBodyContent };
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LectureBodyContent);
