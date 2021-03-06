import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Menu, Dropdown, Segment, Checkbox } from 'semantic-ui-react';
import EditOverviewContent from './EditOverviewContent';
import OverviewContent from './OverviewContent';
import EditLectureBodyContent from './EditLectureBodyContent';
import LectureBodyContent from './LectureBodyContent';
import { LaMaSColours } from '../../utils/colourPalettes';
import '../pages/LecturePage.css';


class LecturePageTutorView extends Component {

    constructor(props) {
        super(props);
        const { subject, lectureName } = props;
        this.state = {
            isEditMode: false,
            mode: 'view',
            isValid: true,
            updatedOverview: this.cloneOverview(subject),
            updatedLecture: this.cloneLecture(subject),
            lectureNameUpdate: lectureName,
        };
    }

    // Replace videos etc. in the cloned lecture
    static getDerivedStateFromProps(nextProps, prevState) {
        const lectureNameUpdate = !prevState.lectureNameUpdate ? nextProps.lectureName : prevState.lectureNameUpdate;

        if (nextProps.lectureId !== '0') {
            const currentLecture = prevState.updatedLecture;
            const propsLecture = nextProps.subject.lectures[nextProps.lectureId];

            const result =  {
                updatedLecture: {
                    ...currentLecture,
                    videos: { ...propsLecture.videos },
                    exercises: { ...propsLecture.exercises },
                    lecture_materials: { ...propsLecture.lecture_materials },
                    name: lectureNameUpdate,
                    // Properly update the cloned Lecture with the correct lecture is_public value
                    is_public: propsLecture.is_public !== currentLecture.is_public ? currentLecture.is_public : propsLecture.is_public,
                },
            };

            if (Object.keys(propsLecture.exercises).length !== Object.keys(currentLecture.exercises).length) {
                return result;
            }

            // Properly update the cloned Lecture with the correct exercise files is_public values
            for (let index in currentLecture.exercises) {
                if (propsLecture.exercises[index].is_public !== currentLecture.exercises[index].is_public) {
                    result.updatedLecture.exercises[index].is_public = currentLecture.exercises[index].is_public;
                }
            }

            return result;
        } else {
            return null;
        }
    }

    cloneOverview = (originalSubject, stateSubject = {}, isCancel = false) => {
        let clonedOverview;

        // if (!isCancel && !isEmptyObject(stateSubject) && stateSubject.subject_id === originalSubject.subject_id) {
        //     clonedOverview = { ...stateSubject };
        // } else {
        //     clonedOverview = {
        //         ...originalSubject.overview,
        //         subject_id: originalSubject.subject_id,
        //     };
        // }

        clonedOverview = {
            ...originalSubject.overview,
            subject_id: originalSubject.subject_id,
        };

        return clonedOverview;
    };

    cloneLecture = (originalSubject) => {
        const { lectureId } = this.props;
        let clonedLecture = {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: {},
        };

        if (lectureId !== '0') {
            const copiedLecture = originalSubject.lectures[lectureId];
            clonedLecture = {
                is_public: copiedLecture.is_public,
                name: copiedLecture.name,
                videos: { ...copiedLecture.videos },
                lecture_materials: { ...copiedLecture.lecture_materials },
                exercises: { ...copiedLecture.exercises },
                comments: { ...copiedLecture.comments },
            };
        }

        return clonedLecture;
    };

    cloneSubject = (originalSubject) => {
        const { lectureId } = this.props;
        const cloneSubject = {
            ...originalSubject,
            overview: { ...originalSubject.overview },
        };

        if (lectureId !== '0') {
            const cloneLecture = originalSubject.lectures[lectureId];
            cloneSubject.lectures[lectureId] = {
                is_public: cloneLecture.is_public,
                name: cloneLecture.name,
                videos: { ...cloneLecture.videos },
                lecture_materials: { ...cloneLecture.lecture_materials },
                exercises: { ...cloneLecture.exercises },
                comments: { ...cloneLecture.comments },
            };
        }

        return cloneSubject;
    };

    handlePublishLecture = (e, { value }) => {
        const { subject, lectureId } = this.props;
        const updatedSubject = Object.assign({}, subject);
        updatedSubject.lectures[lectureId].is_public = !value;

        this.props.saveSubject(updatedSubject);
    };

    handleSave = () => {
        const updatedSubject = this.prepareUpdatedSubjectToBeSubmitted();

        this.props.saveSubject(updatedSubject).then((response) => {
            if (response.message && response.message.includes('success')) {
                this.setState({
                    isEditMode: false,
                    mode: 'view',
                });
            }
        });
    };

    handleCancel = (e) => {
        e.preventDefault();
        const { subject, lectureName } = this.props;

        this.setState({
            updatedOverview: this.cloneOverview(subject, this.state.updatedOverview, true),
            updatedLecture: this.cloneLecture(subject),
            lectureNameUpdate: lectureName,
            isEditMode: false,
            mode: 'view',
        });
    };

    onModeChange = (e, { value }) => {
        // Force mode options to accept only: 'edit' | 'view'
        const mode = value === 'edit' ? 'view' : 'edit';

        this.setState({
            isEditMode: mode === 'edit',
            mode: mode,
        });
    };

    prepareUpdatedSubjectToBeSubmitted = () => {
        const { subject, lectureId } = this.props;
        const { updatedOverview, updatedLecture } = this.state;
        const subjectToBeSubmitted = this.cloneSubject(subject);

        if (lectureId === '0') {
            subjectToBeSubmitted.overview = {
                topics: updatedOverview.topics,
                labs: updatedOverview.labs,
                exam: updatedOverview.exam,
            };
        } else {
            subjectToBeSubmitted.lectures[lectureId] = { ...updatedLecture };
        }

        return subjectToBeSubmitted;
    };

    onOverviewTopicsChange = (value) => {
        const { updatedOverview } = this.state;
        const overviewToBeUpdated = Object.assign({}, updatedOverview);
        overviewToBeUpdated.topics = value;

        this.setState({
            updatedOverview: overviewToBeUpdated,
        });
    };

    onOverviewLabsChange = (value) => {
        const { updatedOverview } = this.state;
        const overviewToBeUpdated = Object.assign({}, updatedOverview);
        overviewToBeUpdated.labs = value;

        this.setState({
            updatedOverview: overviewToBeUpdated,
        });
    };

    onOverviewExamChange = (value) => {
        const { updatedOverview } = this.state;
        const overviewToBeUpdated = Object.assign({}, updatedOverview);
        overviewToBeUpdated.exam = value;

        this.setState({
            updatedOverview: overviewToBeUpdated,
        });
    };

    onLectureTitleChange = (value) => {
        const { updatedLecture } = this.state;
        const lectureToBeUpdated = Object.assign({}, updatedLecture);
        lectureToBeUpdated.name = value;

        this.setState({
            updatedLecture: lectureToBeUpdated,
            isValid: value !== '',
            lectureNameUpdate: value,
        });
    };

    onChangeFilePublish = (value) => {
        const { updatedLecture } = this.state;
        const lectureToBeUpdated = Object.assign({}, updatedLecture);

        if (value.name.split('_')[0] === 'exercises') {
            lectureToBeUpdated.exercises[value.name] = {
                ...lectureToBeUpdated.exercises[value.name],
                is_public: value.checked,
            };

            this.setState({
                updatedLecture: lectureToBeUpdated,
                isValid: value !== '',
            });
        }
    };

    onLecturePublishChange = (event, data) => {
        const { updatedLecture } = this.state;
        const lectureToBeUpdated = Object.assign({}, updatedLecture);
        lectureToBeUpdated.is_public = data.checked;

        this.setState({
            updatedLecture: lectureToBeUpdated,
        });
    };

    renderOnViewModeDropdown = () => {
        const { t, lecture, lectureId } = this.props;

        return (
            <Dropdown.Menu>
                <Dropdown.Item value={ 'view' } onClick={ this.onModeChange }>
                    { t('menu.editLecture') }
                </Dropdown.Item>
                { lectureId !== '0' && (
                    <Dropdown.Item value={ lecture.is_public } onClick={ this.handlePublishLecture }>
                        { lecture.is_public ? t('menu.unpublish') : t('menu.publish') }
                    </Dropdown.Item>
                ) }
            </Dropdown.Menu>
        );
    };

    renderOnEditModeDropdown = () => {
        const { t } = this.props;

        return (
            <Dropdown.Menu>
                <Dropdown.Item name={ 'save' } onClick={ this.handleSave }>
                    { t('menu.save') }
                </Dropdown.Item>
                <Dropdown.Item value={ 'edit' } onClick={ this.handleCancel }>
                    { t('menu.cancel') }
                </Dropdown.Item>
            </Dropdown.Menu>
        );
    };

    renderActionsComponent = () => {
        const { mode } = this.state;
        const { t, breadcrumbComponent } = this.props;

        return (
            <Segment>
                <Grid columns={ 2 }>
                    <Grid.Column floated="left" width={ 4 } verticalAlign={ 'middle' }>
                        { breadcrumbComponent() }
                    </Grid.Column>
                    <Grid.Column floated="right" width={ 3 }>
                        <Menu.Menu id="top-menu-lecture" position="right">
                            <Dropdown
                                id="dropdown-lecture"
                                button
                                className="icon"
                                floating
                                labeled
                                icon="pencil"
                                additionPosition="bottom"
                                direction="left"
                                text={ t('menu.actions') }
                            >
                                { mode === 'view' ? this.renderOnViewModeDropdown() : this.renderOnEditModeDropdown() }
                            </Dropdown>
                        </Menu.Menu>
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    };

    renderLecturesMenu = () => {
        const { t, subject, lectureId, handleOverviewMenuClick, handleLectureMenuClick } = this.props;
        const { lectures } = subject;

        return (
            <Menu fluid vertical tabular>
                <Menu.Item
                    color={ LaMaSColours['public-lecture-active'] }
                    className={ 'public-lecture' }
                    name={ t('baseLayout.overview') }
                    id={ 0 }
                    key={ 0 }
                    active={ lectureId === '0' }
                    onClick={ handleOverviewMenuClick }
                />
                { Object.keys(lectures).map((index, key) => (
                    <Menu.Item
                        color={ lectures[index].is_public ? LaMaSColours['public-lecture-active'] : LaMaSColours['unpublic-lecture-active'] }
                        className={ lectures[index].is_public ? 'public-lecture' : 'unpublic-lecture' }
                        name={ t('baseLayout.lecture') + ( key + 1 ) }
                        id={ index }
                        key={ index }
                        active={ lectureId === index }
                        onClick={ handleLectureMenuClick }
                    />
                )) }
            </Menu>
        );
    };

    renderOverviewContent = () => {
        const { isEditMode, updatedOverview } = this.state;
        const { t, subject, subject_full_name, subject_id, lectureId } = this.props;

        return (
            <Grid.Column width={ 10 }>
                { isEditMode && (
                    <EditOverviewContent
                        t={ t }
                        subject_full_name={ subject_full_name }
                        overview={ updatedOverview }
                        onOverviewTopicsChange={ this.onOverviewTopicsChange }
                        onOverviewLabsChange={ this.onOverviewLabsChange }
                        onOverviewExamChange={ this.onOverviewExamChange }
                    />
                ) }

                { !isEditMode && (
                    <OverviewContent
                        key={ subject_id + '-' + lectureId }
                        t={ t }
                        subject_full_name={ subject_full_name }
                        overview={ subject.overview }
                    />
                ) }
            </Grid.Column>
        );
    };

    renderLectureContent = () => {
        const { isEditMode, isValid, updatedLecture, lectureNameUpdate } = this.state;
        const { t, subject, subject_id, lecture, lectureId, lectureTitle, nameOnStorage, videoUrl, onSelectFileClick, onSelectVideoClick, showVideo, comments } = this.props;

        return (
            <>
                <Grid.Column width={ 10 }>
                    { isEditMode && (
                        <EditLectureBodyContent
                            t={ t }
                            subject={ subject }
                            lecture={ updatedLecture }
                            lectureTitle={ lectureTitle }
                            lectureName={ lectureNameUpdate }
                            isValid={ isValid }
                            onLectureTitleChange={ this.onLectureTitleChange }
                            onSelectVideoClick={ onSelectVideoClick }
                            onSelectFileClick={ onSelectFileClick }
                            onChangeFilePublish={ this.onChangeFilePublish }
                        />
                    ) }

                    { !isEditMode && (
                        <LectureBodyContent
                            isStudent={ false }
                            key={ subject_id + '-' + lectureId }
                            t={ t }
                            lectureId={ lectureId }
                            subject={ subject }
                            lecture={ lecture }
                            lectureTitle={ lectureTitle }
                            onSelectVideoClick={ onSelectVideoClick }
                            onSelectFileClick={ onSelectFileClick }
                            nameOnStorage={ nameOnStorage }
                            videoUrl={ videoUrl }
                            showVideo={ showVideo }
                            comments={ comments }
                            onCommentSubmit={ this.props.onCommentSubmit }
                        />
                    ) }
                </Grid.Column>

                <Grid.Column width={ 3 }>
                    { isEditMode && (
                        <Checkbox
                            toggle
                            label={ lecture.is_public ? t('editLecture.unpublish') : t('editLecture.publish') }
                            defaultChecked={ lecture.is_public }
                            onChange={ this.onLecturePublishChange }
                        />
                    ) }
                </Grid.Column>
            </>
        );
    };

    render() {
        const { lectureId } = this.props;

        return (
            <>
                { this.renderActionsComponent() }

                <Grid columns={ 3 }>
                    <Grid.Column width={ 3 }>{ this.renderLecturesMenu() }</Grid.Column>
                    { lectureId === '0' && this.renderOverviewContent() }
                    { lectureId !== '0' && this.renderLectureContent() }
                </Grid>
            </>
        );
    }
}


LecturePageTutorView.propTypes = {
    lectureTitle: PropTypes.string.isRequired,
    lecture: PropTypes.object.isRequired,
};

export default LecturePageTutorView;
