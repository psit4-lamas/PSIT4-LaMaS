import React, { Component } from 'react';
import fire from '../../firebase';
import { connect } from 'react-redux';
import withAuthorization from '../../utils/withAuthorization';
import { UserRoles } from '../../utils';
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

    handleUploadStart = (obj1, obj2) => {
        const filename = obj1.name;

        this.setState({
            isUploading: true,
            progress: 0,
            filename: filename,
        });

        obj2.metadata_.customMetadata.originalName = filename;
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
        const { isUploading, progress, errorOccurred, error } = this.state;
        const { buttonLabel, fileType, subject, lectureId } = this.props;

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
                                      subjectId: subject.subject_id,
                                      lecture: lectureId.substring(lectureId.length - 2, lectureId.length),
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

                { errorOccurred && error }
            </div>
        );
    }
}


const condition = (authUser) => authUser && !!authUser.roles && authUser.roles.includes(UserRoles.TUTOR);

const mapStateToProps = (state) => ( {
    user: state.user,
    lectureId: state.subject.currentLectureID,
} );

const mapDispatchToProps = {};

export { UploadComponent, condition };
export default withAuthorization(condition)(connect(mapStateToProps, mapDispatchToProps)(UploadComponent));
