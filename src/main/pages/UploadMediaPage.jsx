import React, {Component} from 'react';
import fire from '../../firebase';
import { withNamespaces } from 'react-i18next';
import VideoUpload from '../VideoUploadComponent/VideoUpload';
import FileList from '../FileListComponent/FileList';
import './UploadMediaPage.css';


class UploadMediaPage extends Component {
    // TODO: improve upload media page UI
    render() {
        const { t } = this.props;

        return (
            <React.Fragment>

                <main>
                    On the upload page!
                    <VideoUpload t={ t }/>
                </main>
                <br/>
                <br/>
                <FileList firebase={ fire } type={ 'V' } t={ t }/>
                <FileList firebase={ fire } type={ 'L' } t={ t }/>
                <FileList firebase={ fire } type={ 'E' } t={ t }/>
            </React.Fragment>
        );
    }
}


export default withNamespaces()(UploadMediaPage);
