import React, {Component} from 'react';
import fire from '../../firebase';
import { withNamespaces } from 'react-i18next';
import UploadComponent from '../UploadComponent/UploadComponent';
import FileList from '../FileListComponent/FileList';
import './UploadMediaPage.css';


class UploadMediaPage extends Component {
    // TODO: improve upload media page UI
    render() {
        const { t } = this.props;

        return (
            <React.Fragment>

                <main>
                    <UploadComponent fileType={ 'V' } buttonLabel={ t('uploadComponent.selectVideo') }/>
                </main>
                <br/>
                <FileList firebase={ fire } type={ 'V' } t={ t }/>
                <br/>
                <br/>
                <main>
                    <UploadComponent fileType={ 'L' } buttonLabel={ t('uploadComponent.selectLecture') }/>
                </main>
                <br/>
                <FileList firebase={ fire } type={ 'L' } t={ t }/>
                <br/>
                <br/>
                <main>
                    <UploadComponent fileType={ 'E' } buttonLabel={ t('uploadComponent.selectExercise') }/>
                </main>
                <br/>
                <FileList firebase={ fire } type={ 'E' } t={ t }/>
            </React.Fragment>
        );
    }
}


export default withNamespaces()(UploadMediaPage);
