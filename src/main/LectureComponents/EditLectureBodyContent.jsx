import React, { Component } from 'react';
import { withNameSpacesAndRouterAndRedux } from '../../utils';
import UploadMediaPage from '../pages/UploadMediaPage';
import './LectureBodyContent.css';
import { Form, FormField, Input } from 'semantic-ui-react';
import { setNewLectureTitle } from '../actions';


class EditLectureBodyContent extends Component {
    // TODO: improve lecture body content UI (Sprint 2)
    constructor(props) {
        super(props);
        this.state = { lectureTitle: this.props.lecture.name };
    }

    handleChange(e) {
        this.setState({ lectureTitle: e.target.value });
        this.props.setNewLectureTitle(e.target.value);
    }

    render() {
        const { t, lecture } = this.props;
        let lectureName = lecture.name;

        return (
            <div>
                <h1>
                    { t('editLecture.editLecture') } { this.props.lectureId.substring(this.props.lectureId.length - 2, this.props.lectureId.length) }{ ' ' }
                </h1>
                <div>
                    <Form>
                        <FormField>
                            { t('editLecture.lectureTitle') }
                            <Input focus value={ this.props.newLectureTitle ? this.props.newLectureTitle : lectureName } onChange={ (e) => this.handleChange(e) }/>
                        </FormField>
                    </Form>

                    <UploadMediaPage editMode={ true }/>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ( {
    lecture: state.subject.currentSubject.lectures[state.subject.currentLectureID],
    lectureId: state.subject.currentLectureID,
    newLectureTitle: state.subject.newLectureTitle,
} );

const mapDispatchToProps = { setNewLectureTitle };

export default withNameSpacesAndRouterAndRedux(mapStateToProps, mapDispatchToProps, EditLectureBodyContent);
