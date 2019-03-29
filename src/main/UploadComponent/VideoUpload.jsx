import React, { Component } from 'react';
import fire from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import { Progress } from 'semantic-ui-react';


class VideoUpload extends Component {

    state = {
        progress: 0,
        isUploading: false,
        filename: '',
        errorOccurred: false,
        error: '',
    };

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

    handleUploadError = (error) => {
        this.setState({ isUploading: false, errorOccurred: true, error: error });
    };

    handleUploadSuccess = () => {
        this.setState({ progress: 100, isUploading: false });
    };

    handleProgress = (progress) => this.setState({ progress });

    render() {
        const { isUploading, progress, errorOccurred } = this.state;
        const { t } = this.props;

        return (
            <div>
                { isUploading ? (
                    <Progress percent={ progress } indicating progress label="uploading"/>
                ) : (
                    <label style={ { backgroundColor: 'pink', color: 'white', padding: 20, borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' } }>
                        { t('uploadComponent.selectVideo') }
                        <FileUploader
                            accept="video/*"
                            hidden
                            name="file"
                            randomizeFilename
                            storageRef={ fire.storage().ref('files') }
                            onUploadStart={ this.handleUploadStart }
                            metadata={ { customMetadata: { subject: 'KI', lecture: 1, type: 'V', originalName: 'myFile' } } }
                            onUploadError={ this.handleUploadError }
                            onUploadSuccess={ this.handleUploadSuccess }
                            onProgress={ this.handleProgress }
                        />
                    </label>
                ) }

                { errorOccurred ? 'Error happened' : '' }
            </div>
        );
    }
}


export default VideoUpload;
