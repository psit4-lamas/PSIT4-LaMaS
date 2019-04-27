import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message, FormField, Input } from 'semantic-ui-react';
import UploadMediaPage from '../pages/UploadMediaPage';
import './LectureBodyContent.css';


class EditLectureBodyContent extends Component {

    handleChange = (e) => {
        this.props.onLectureTitleChange(e.target.value);
    };

    render() {
        const { t, subject, lecture, lectureTitle, lectureName, isValid, onSelectVideoClick, onSelectFileClick } = this.props;

        return (
            <>
                <h1>
                    { t('editLecture.editLecture') }
                    { lectureTitle }
                    { !!lectureName ? ` - ${ lectureName }` : '' }
                </h1>

                <div style={ { marginTop: '25px' } }>
                    <FormField>
                        { !isValid &&
                            <Message negative>
                                <Message.Header>{ t('editLecture.negativeMsgTitle') }</Message.Header>
                                <p>{ t('editLecture.negativeMsgBox1') }</p>
                            </Message>
                        }

                        <label>{ t('editLecture.lectureTitle') }</label>
                        <Input focus
                               name="lectureTitle"
                               value={ lectureName }
                               placeholder={ t('editLecture.lectureTitlePlaceholder') }
                               onChange={ this.handleChange }
                        />
                    </FormField>

                    {/* TODO: wrap the 'unpublish' input component for exercise solution files */}
                    <UploadMediaPage
                        t={ t }
                        editMode={ true }
                        subject={ subject }
                        lecture={ lecture }
                        onSelectVideoClick={ onSelectVideoClick }
                        onSelectFileClick={ onSelectFileClick }
                    />
                </div>
            </>
        );
    }
}


EditLectureBodyContent.propTypes = {
    lectureTitle: PropTypes.string.isRequired,
    lecture: PropTypes.object.isRequired,
    onLectureTitleChange: PropTypes.func.isRequired,
};

export default EditLectureBodyContent;
