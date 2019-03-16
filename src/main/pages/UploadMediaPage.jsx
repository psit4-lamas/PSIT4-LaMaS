import React, {Component} from 'react';
import fire from '../../firebase';
import VideoUpload from '../VideoUploadComponent/VideoUpload';
import FileList from '../FileListComponent/FileList';
import './UploadMediaPage.css';
import TopMenu from '../ComponentMenu/TopMenu';


class UploadMediaPage extends Component {
    // TODO: improve upload media page UI
    render() {
        return (
            <React.Fragment>
                <header><TopMenu/></header>

                <main>
                    On the upload page!
                    <VideoUpload/>
                </main>
                <br/>
                <br/>
                <FileList firebase={ fire } type={ 'V' }/>
                <FileList firebase={ fire } type={ 'L' }/>
                <FileList firebase={ fire } type={ 'E' }/>
                <footer>Feet</footer>
            </React.Fragment>
        );
    }
}


export default UploadMediaPage;
