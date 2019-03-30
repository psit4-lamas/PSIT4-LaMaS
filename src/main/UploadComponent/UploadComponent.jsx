import React, { Component } from 'react';
import fire from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import { Progress } from 'semantic-ui-react';


class UploadComponent extends Component {

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

    getAcceptedFileType = () => {
        const { fileType } = this.props;

        if ( fileType === 'V' ) {
            return 'video/*';
        } else {
            return '*';
        }
    };

    handleProgress = (progress) => this.setState({ progress });

    render() {
        const { isUploading, progress, errorOccurred } = this.state;
        const { buttonLabel, fileType } = this.props;

        const acceptedFileTypes = this.getAcceptedFileType();

        return (
            <div>
                { isUploading ? (
                    <Progress percent={ progress } indicating progress label="uploading"/>
                ) : (
                    <label style={ { backgroundColor: 'pink', color: 'white', padding: 20, borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' } }>
                        { buttonLabel }
                        <FileUploader
                            hidden
                            accept={ acceptedFileTypes }
                            name="file"
                            randomizeFilename
                            storageRef={ fire.storage().ref('files') }
                            onUploadStart={ this.handleUploadStart }
                            metadata={ { customMetadata: { subject: 'KI', lecture: 1, type: fileType, originalName: 'myFile' } } }
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


export default UploadComponent;