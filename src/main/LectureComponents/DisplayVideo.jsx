import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFile } from '../actions';
import './LectureBodyContent.css';


class DisplayVideo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fetchedVideo: '',
        };
    }

    componentWillMount() {
        const { nameOnStorage } = this.props;

        if (!!nameOnStorage) {
            this.props.fetchVideo(nameOnStorage)
                .then(fetchedVideo => {
                    this.setState({ fetchedVideo });
                });
        }
    }

    render() {
        const { fetchedVideo } = this.state;
        const { videoUrl } = this.props;

        return (
            <>
                <video
                    width="640"
                    height="100%"
                    controls
                    src={ videoUrl ? videoUrl : fetchedVideo }
                >
                    Your browser does not support the video tag.
                </video>
                <br/>
            </>
        );
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
