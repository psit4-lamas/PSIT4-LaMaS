import React, { Component } from 'react';
import fire from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import { Progress } from 'semantic-ui-react';
import { withRouterAndRedux } from '../../utils';


class UploadComponent extends Component {
    state = {
        progress: 0,
        isUploading: false,
        filename: '',
        errorOccurred: false,
        error: '',
    };

    handleUploadStart = (obj1, obj2) => {
        this.setState({
            isUploading: true,
            progress: 0,
        });
        obj2.metadata_.customMetadata.originalName = obj1.name;
    };
    handleUploadError = (error) => {
        this.setState({
            isUploading: false,
            errorOccurred: true,
            error: error,
        });
    };

    handleUploadSuccess = () => {
        this.setState({
            progress: 100,
            isUploading: false,
        });
    };

    getAcceptedFileType = () => {
        const { fileType } = this.props;

        if (fileType === 'V') {
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
                      <label
                          style={ {
                              backgroundColor: 'pink',
                              color: 'white',
                              padding: 5,
                              borderRadius: 4,
                              cursor: 'pointer',
                              fontWeight: 'bold',
                          } }
                      >
                          { buttonLabel }
                          <FileUploader
                              hidden
                              accept={ acceptedFileTypes }
                              name="upload"
                              randomizeFilename
                              storageRef={ fire.storage().ref('files') }
                              onUploadStart={ this.handleUploadStart }
                              metadata={ {
                                  customMetadata: {
                                      subjectId: this.props.subject.subject_id,
                                      lecture: this.props.lectureId.substring(this.props.lectureId.length - 2, this.props.lectureId.length),
                                      type: fileType,
                                      originalName: 'myFile',
                                  },
                              } }
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


const mapStateToProps = (state) => ( {
    lectureId: state.subject.currentLectureID,
} );

const mapDispatchToProps = {};

export { UploadComponent };

export default withRouterAndRedux(mapStateToProps, mapDispatchToProps, UploadComponent);
