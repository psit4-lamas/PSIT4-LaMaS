import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Menu, Dropdown, Segment, Checkbox } from 'semantic-ui-react';
import EditLectureBodyContent from './EditLectureBodyContent';
import LectureBodyContent from './LectureBodyContent';
import { LaMaSColours } from '../../utils/colourPalettes';
import '../pages/LecturePage.css';


class LecturePageTutorView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditMode: false,
            mode: 'view',
            isValid: true,
        };
    }

    handlePublishLecture = (e) => {
        // TODO: add action to POST a request to publish this lecture
        console.log('Not yet implemented!', e.target.value);
    };

    handleSaveLecture = () => {
        const { subject } = this.props;

        this.props.saveSubject(subject).then((response) => {
            if (response.message && response.message.includes('success')) {
                this.setState({
                    isEditMode: false,
                    mode: 'view',
                });
            }
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

    onLectureTitleChange = (value) => {
        const { subject, lectureId } = this.props;
        const updatedSubject = Object.assign({}, subject);
        updatedSubject.lectures[lectureId].name = value;

        this.setState(
            {
                isValid: value !== '',
            },
            () => this.props.onLectureTitleUpdate(updatedSubject, value),
        );
    };

    onLecturePublishChange = (event, data) => {
        const { subject, lectureId } = this.props;
        const updatedSubject = Object.assign({}, subject);
        updatedSubject.lectures[lectureId].is_public = data.checked;

        this.setState({},
            () => this.props.onLecturePublishUpdate(updatedSubject, data.checked)
        );
    };

    renderOnViewModeDropdown = () => {
        // TODO: add check for the current lecture is_published: true | false
        const { t, lectureId } = this.props;

        return (
            <Dropdown.Menu>
                <Dropdown.Item value={ 'view' } onClick={ this.onModeChange }>
                    { t('menu.editLecture') }
                </Dropdown.Item>
                <Dropdown.Item value={ lectureId } onClick={ this.handlePublishLecture } disabled>
                    { t('menu.unpublish') }
                </Dropdown.Item>
            </Dropdown.Menu>
        );
    };

    renderOnEditModeDropdown = () => {
        // TODO: check how to retrieve the form data to be submitted
        const { t } = this.props;

        return (
            <Dropdown.Menu>
                <Dropdown.Item name={'save'} onClick={ this.handleSaveLecture }>{ t('menu.save') }</Dropdown.Item>
                <Dropdown.Item value={ 'edit' } onClick={ this.onModeChange }>
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
        const { t, subject, lectureId, handleLectureMenuClick } = this.props;
        const { lectures } = subject;

        return (
            <Menu fluid vertical tabular>
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

    render() {
        const { isEditMode, isValid } = this.state;

        const { lectureName } = this.props;
        const { t, subject, subject_id, lecture, lectureId, lectureTitle, nameOnStorage, videoUrl, onSelectFileClick, onSelectVideoClick, showVideo } = this.props;

        return (
            <>
                { this.renderActionsComponent() }

                <Grid columns={ 3 }>
                    <Grid.Column width={ 3 }>{ this.renderLecturesMenu() }</Grid.Column>

                    <Grid.Column width={ 10 }>
                        { isEditMode && (
                            <EditLectureBodyContent
                                t={ t }
                                subject={ subject }
                                lecture={ lecture }
                                lectureTitle={ lectureTitle }
                                lectureName={ lectureName }
                                isValid={ isValid }
                                onLectureTitleChange={ this.onLectureTitleChange }
                                onSelectVideoClick={ onSelectVideoClick }
                                onSelectFileClick={ onSelectFileClick }
                            />
                        ) }

                        { !isEditMode && (
                            <LectureBodyContent
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
