import React, { Component } from 'react';
import fire from '../../firebase';
import PropTypes from 'prop-types';
import FileList from '../FileListComponent/FileList';
import './UploadMediaPage.css';


class UploadMediaPage extends Component {

    render() {
        const { t, isStudent, editMode, subject, lecture, onSelectVideoClick, onSelectFileClick, onChangeFilePublish } = this.props;

        return (
            <>
                <FileList editMode={ editMode } firebase={ fire } type={ 'V' } t={ t }
                          subject={ subject } lecture={ lecture } isStudent={ isStudent }
                          onSelectFile={ onSelectVideoClick }
                />

                <FileList editMode={ editMode } firebase={ fire } type={ 'L' } t={ t }
                          subject={ subject } lecture={ lecture } isStudent={ isStudent }
                          onSelectFile={ onSelectFileClick }
                />

                <FileList editMode={ editMode } firebase={ fire } type={ 'E' } t={ t }
                          subject={ subject } lecture={ lecture } isStudent={ isStudent }
                          onSelectFile={ onSelectFileClick }
                          onChangeFilePublish={onChangeFilePublish}
                />
            </>
        );
    }
}


UploadMediaPage.propTypes = {
    editMode: PropTypes.bool.isRequired,
    lecture: PropTypes.object.isRequired,
};

UploadMediaPage.defaultProps = {
    editMode: false,
};

export { UploadMediaPage };
export default UploadMediaPage;
