import React, { Component } from 'react';
import fire from '../../firebase';
import PropTypes from 'prop-types';
import FileList from '../FileListComponent/FileList';
import './UploadMediaPage.css';


class UploadMediaPage extends Component {

    render() {
        const { t, editMode, subject, lecture, onSelectVideoClick } = this.props;

        return (
            <>
                <FileList editMode={ editMode } firebase={ fire } type={ 'V' } t={ t }
                          subject={ subject } lecture={ lecture }
                          onSelectVideoClick={ onSelectVideoClick }
                />

                <FileList editMode={ editMode } firebase={ fire } type={ 'L' } t={ t } subject={ subject } lecture={ lecture }/>

                <FileList editMode={ editMode } firebase={ fire } type={ 'E' } t={ t } subject={ subject } lecture={ lecture }/>
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
