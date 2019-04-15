import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchVideo } from '../actions';
import './LectureBodyContent.css';


class DisplayVideo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videoUrl: '',
        };
    }

    componentWillMount() {
        this.handleDisplayVideo()
    }

    handleDisplayVideo = () => {
        const { nameOnStorage } = this.props;

        this.props.fetchVideo(nameOnStorage)
            .then(videoUrl => {
                this.setState({ videoUrl });
            });
    };

    render() {
        const { videoUrl } = this.state;

        return (
            <>
                <video
                    width="640"
                    height="100%"
                    controls
                    src={ videoUrl }
                >
                    Your browser does not support the video tag.
                </video>
            </>
        );
    }
}


DisplayVideo.propTypes = {
    nameOnStorage: PropTypes.string.isRequired,
};


const mapStateToProps = (state) => ( {} );

const mapDispatchToProps = {
    fetchVideo,
};

export { DisplayVideo };
export default connect(mapStateToProps, mapDispatchToProps)(DisplayVideo);
