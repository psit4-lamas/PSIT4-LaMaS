import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFile } from '../actions';
import './LectureBodyContent.css';


class DisplayVideo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fetchedVideo: props.videoUrl,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { videoUrl } = nextProps;
        console.log("TheUrlIS:" + videoUrl);
        if (videoUrl !== prevState.fetchedVideo) {
            console.log("fetched");
            return { fetchedVideo: videoUrl };
        } else
        {
            return null;
        }


    }

    render() {
        console.log("rerender video");
        const { fetchedVideo } = this.state;
        if (fetchedVideo) {
            return (
                <>
                    {  }
                    <video
                        width="640"
                        height="100%"
                        controls
                        src={ fetchedVideo }
                    >
                        Your browser does not support the video tag.
                    </video>
                    <br/>
                </>
            );
        }
        else
        {
            return null;
        }

    }
}


DisplayVideo.propTypes = {
    nameOnStorage: PropTypes.string.isRequired,
};


const mapStateToProps = (state) => ( {} );

const mapDispatchToProps = {
    fetchVideo: fetchFile,
};

export { DisplayVideo };
export default connect(mapStateToProps, mapDispatchToProps)(DisplayVideo);
