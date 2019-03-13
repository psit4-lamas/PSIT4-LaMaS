import React, { Component } from 'react';
import VideoUpload from '../VideoUploadComponent/VideoUpload';
import './UploadMediaPage.css';


class UploadMediaPage extends Component {

    // TODO: improve upload media page UI
    render() {

        return (
            <React.Fragment>
                <header>Head</header>

                <main>On the upload page!<VideoUpload /></main>

                <footer>Feet</footer>
            </React.Fragment>
        );
    }
}


export default UploadMediaPage;
