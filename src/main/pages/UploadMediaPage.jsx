import React, {Component} from 'react';
import fire from '../../firebase';
import VideoUpload from '../VideoUploadComponent/VideoUpload';
import FileList from '../FileListComponent/FileList';
import './UploadMediaPage.css';


class UploadMediaPage extends Component {
    // TODO: improve upload media page UI
    render() {
        return (
            <React.Fragment>

                <main>
                    On the upload page!
                    <VideoUpload/>
                </main>
                <br/>
                <br/>
                <FileList firebase={ fire } type={ 'V' }/>
                <FileList firebase={ fire } type={ 'L' }/>
                <FileList firebase={ fire } type={ 'E' }/>
            </React.Fragment>
        );
    }
}


export default UploadMediaPage;
