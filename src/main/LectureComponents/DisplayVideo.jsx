import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './LectureBodyContent.css';


class DisplayVideo extends Component {
    render() {
        const { videoUrl } = this.props;
        if (videoUrl) {
            return (
                <>
                    <video id="video-component" height="100%" controls src={ videoUrl }>
                        Your browser does not support the video tag.
                    </video>
                    <br/>
                </>
            );
        } else {
            return null;
        }
    }
}


DisplayVideo.propTypes = {
    nameOnStorage: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ( {} );

const mapDispatchToProps = {};

export { DisplayVideo };
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DisplayVideo);
