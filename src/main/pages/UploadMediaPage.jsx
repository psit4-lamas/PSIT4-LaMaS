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
            <div>

                <UploadComponent fileType={ 'V' } buttonLabel={ t('uploadComponent.selectVideo') }/>
                <br/>
                <FileList firebase={ fire } type={ 'V' } t={ t }/>
                <br/>
                <br/>

                <UploadComponent fileType={ 'L' } buttonLabel={ t('uploadComponent.selectLecture') }/>
                <br/>
                <FileList firebase={ fire } type={ 'L' } t={ t }/>
                <br/>
                <br/>

                <UploadComponent fileType={ 'E' } buttonLabel={ t('uploadComponent.selectExercise') }/>
                <br/>
                <FileList firebase={ fire } type={ 'E' } t={ t }/>
            </div>
        );
    }
}


export default withNamespaces()(UploadMediaPage);
