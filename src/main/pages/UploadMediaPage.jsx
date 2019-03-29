import React, {Component} from 'react';
import fire from '../../firebase';
import { withNamespaces } from 'react-i18next';
import VideoUpload from '../UploadComponent/VideoUpload';
import LectureUpload from '../UploadComponent/LectureUpload';
import ExerciseUpload from '../UploadComponent/ExerciseUpload';
import FileList from '../FileListComponent/FileList';
import './UploadMediaPage.css';


class UploadMediaPage extends Component {
    // TODO: improve upload media page UI
    render() {
        const { t } = this.props;

        return (
            <React.Fragment>

                <main>
                    <VideoUpload t={ t }/>
                </main>
                <br/>
                <FileList firebase={ fire } type={ 'V' } t={ t }/>
                <br/>
                <br/>
                <main>
                    <LectureUpload t={ t }/>
                </main>
                <br/>
                <FileList firebase={ fire } type={ 'L' } t={ t }/>
                <br/>
                <br/>
                <main>
                    <ExerciseUpload t={ t }/>
                </main>
                <br/>
                <FileList firebase={ fire } type={ 'E' } t={ t }/>
            </React.Fragment>
        );
    }
}


export default withNamespaces()(UploadMediaPage);
