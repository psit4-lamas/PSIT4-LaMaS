import React, { Component } from 'react';
import fire from '../../firebase';
import FileList from '../FileListComponent/FileList';
import './UploadMediaPage.css';


class UploadMediaPage extends Component {
    // TODO: improve upload media page UI
    render() {
        const { t, editMode } = this.props;

        return (
            <div>
                <br/>
                <FileList editMode={ editMode } firebase={ fire } type={ 'V' } t={ t }/>

                <FileList editMode={ editMode } firebase={ fire } type={ 'L' } t={ t }/>

                <FileList editMode={ editMode } firebase={ fire } type={ 'E' } t={ t }/>
            </div>
        );
    }
}


export { UploadMediaPage };
export default UploadMediaPage;
