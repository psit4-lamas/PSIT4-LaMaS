import React, {Component} from 'react';
import fire from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';


class VideoUpload extends Component {
    state = {
        progress: 0,
        isUploading: false,
        filename: '',
        errorOccurred: false,
        error: '',
    };
    handleUploadStart = () => this.setState({isUploading: true, progress: 0});

    handleUploadError = error => {
        this.setState({isUploading: false, errorOccurred: true, error: error});
    };

    handleUploadSuccess = filename => {
        this.setState({progress: 100, isUploading: false});
        let videoElem = {
            filename: filename,
            lecture: 'abc'
        }
        fire.firestore().collection('videos').add( videoElem );
    }

    handleProgress = progress => this.setState({progress});

    // TODO: stuff
    render() {

        return (
            <div>
                { this.state.isUploading ? ( this.state.isUploading && <p>Progress: { this.state.progress }</p> ) : (
                    <label style={ {backgroundColor: 'steelblue', color: 'white', padding: 40, borderRadius: 4, borderColor: 'black', pointer: 'cursor'} }>
                        Select file to upload ...

                        <FileUploader hidden name="video" randomizeFilename storageRef={ fire.storage().ref('videos') }
                                      onUploadStart={ this.handleUploadStart }
                                      metadata={{customMetadata: {'lecture': 'abc'}
                                      }}
                                      onUploadError={ this.handleUploadError }
                                      onUploadSuccess={ this.handleUploadSuccess }
                                      onProgress={ this.handleProgress }/>
                    </label> ) }
                { this.state.errorOccurred ? 'Error happened' : '' }
            </div>

        );
    }
}


export default VideoUpload;
