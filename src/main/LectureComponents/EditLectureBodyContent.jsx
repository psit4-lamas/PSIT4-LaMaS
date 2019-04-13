import React, { Component } from 'react';
import { withNameSpacesAndRedux } from '../../utils';
import UploadMediaPage from '../pages/UploadMediaPage';
import { Form, FormField, Input } from 'semantic-ui-react';
import { setNewLectureTitle } from '../actions';
import { Message } from 'semantic-ui-react';


class EditLectureBodyContent extends Component {
    // TODO: improve lecture body content UI (Sprint 2)

    constructor(props) {
        super(props);
        this.state = {
            lectureTitle: this.props.lecture.name,
            isValid: true,
        };
    }

    handleChange(e) {
        this.setState({ lectureTitle: e.target.value });
        if (e.target.value === '') {
            this.setState({ isValid: false });
        } else {
            this.setState({ isValid: true });
        }
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
                            { !this.state.isValid ? (
                                <Message negative>
                                    <Message.Header>{ t('editLecture.negativeMsgTitle') }</Message.Header>
                                    <p>{ t('editLecture.negativeMsgBox1') }</p>
                                </Message>
                            ) : null }
                            { t('editLecture.lectureTitle') }
                            <Input name="lectureTitle" focus value={ this.props.newLectureTitle ? this.props.newLectureTitle : lectureName }
                                   onChange={ (e) => this.handleChange(e) }/>
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
export { EditLectureBodyContent };
export default withNameSpacesAndRedux(mapStateToProps, mapDispatchToProps, EditLectureBodyContent);
