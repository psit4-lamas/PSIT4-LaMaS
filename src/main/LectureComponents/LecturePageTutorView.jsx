import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { saveSubject } from '../actions';
import { Grid, Menu, Dropdown, Segment } from 'semantic-ui-react';
import EditLectureBodyContent from './EditLectureBodyContent';
import LectureBodyContent from './LectureBodyContent';
import { LaMaSColours } from '../../utils/colourPalettes';
import '../pages/LecturePage.css';


class LecturePageTutorView extends Component {

    state = {
        // subject: {},
        //// lectureID: lectureID,
        // currentLecture: {},
        isEditMode: false,
        mode: 'view',
        // lectureName: '',
        isValid: true,
        //// videoUrl: '',
        //// nameOnStorage: '',
    };

    // constructor(props) {
    //     super(props);
    //     //// const lectureID = 'lecture_01';
    //
    //     this.state = {
    //         // subject: {},
    //         //// lectureID: lectureID,
    //         // currentLecture: {},
    //         isEditMode: false,
    //         mode: 'view',
    //         // lectureName: '',
    //         isValid: true,
    //         //// videoUrl: '',
    //         //// nameOnStorage: '',
    //     };
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.videoUrl ==='') {
    //         this.showFirstVideoOfLecture(this.state.lectureID);
    //     }
    // }
    //
    // showFirstVideoOfLecture = (lectureID) => {
    //     const { subject } = this.props;
    //     const currentLecture = subject.lectures[lectureID];
    //     let nameOnStorage = Object.keys(currentLecture.videos).length > 0 ? currentLecture.videos.videos_00.nameOnStorage : '';
    //
    //     if (nameOnStorage) {
    //         this.showVideo(nameOnStorage);
    //     }
    // };

    // showVideo = (nameOnStorage) => {
    //     this.props.fetchFile(nameOnStorage).then((videoUrl) => {
    //         this.setState({
    //             nameOnStorage: nameOnStorage,
    //             videoUrl: videoUrl,
    //         });
    //     });
    // };

    // handleLectureMenuClick = (e) => {
    //     this.props.selectLecture(e.target.id);
    //     const { subject } = this.props;
    //
    //     const lectureID = e.target.id;
    //     const currentLecture = subject.lectures[lectureID];
    //
    //     this.setState({
    //         lectureID: lectureID,
    //         currentLecture: currentLecture,
    //         lectureName: currentLecture.name || '',
    //         videoUrl: '',
    //         nameOnStorage: '',
    //     });
    //
    //     this.showFirstVideoOfLecture(lectureID);
    // };

    handlePublishLecture = (e) => {
        // TODO: add action to POST a request to publish this lecture
        console.log('Not yet implemented!', e.target.value);
    };

    handleSaveLecture = () => {
        const { subject } = this.props;

        this.props.saveSubject(subject)
            .then((response) => {
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
        // const { subject } = this.state;
        const updatedSubject = Object.assign({}, subject);
        updatedSubject.lectures[lectureId].name = value;

        this.setState({
            // subject: subject,
            // lectureName: value,
            isValid: value !== '',
        }, () => this.props.onLectureTitleUpdate(updatedSubject, value));
    };

    renderOnViewModeDropdown = () => {
        // TODO: add check for the current lecture is_published: true | false
        // const { subject } = this.state;
        const { t, subject } = this.props;

        return (
            <Dropdown id="dropdown-lecture" button className="icon" floating labeled icon="pencil" additionPosition="bottom" text={ t('menu.actions') }>
                <Dropdown.Menu>
                    <Dropdown.Item value={ 'view' } onClick={ this.onModeChange }>
                        { t('menu.editLecture') }
                    </Dropdown.Item>
                    <Dropdown.Item value={ subject.subject_id } onClick={ this.handlePublishLecture }>
                        { t('menu.unpublish') }
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    renderOnEditModeDropdown = () => {
        // TODO: check how to retrieve the form data to be submitted
        const { t } = this.props;

        return (
            <Dropdown id="dropdown-lecture" button className="icon" floating labeled icon="pencil"
                      additionPosition="bottom" direction="left" text={ t('menu.actions') }>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={ this.handleSaveLecture }>
                        { t('menu.save') }
                    </Dropdown.Item>
                    <Dropdown.Item value={ 'edit' } onClick={ this.onModeChange }>
                        { t('menu.cancel') }
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    renderActionsComponent = () => {
        const { mode } = this.state;
        const { breadcrumbComponent } = this.props;

        return (
            <Segment>
                <Grid columns={ 2 }>
                    <Grid.Column floated='left' width={ 4 } verticalAlign={ 'middle' }>
                        { breadcrumbComponent() }
                    </Grid.Column>
                    <Grid.Column floated='right' width={ 3 }>
                        <Menu.Menu id="top-menu-lecture" position="right">
                            { mode === 'view' ? this.renderOnViewModeDropdown() : this.renderOnEditModeDropdown() }
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
        // let { currentLecture } = this.state;

        const { lectureName } = this.props;
        const { t, subject, subject_id, lecture, lectureId, lectureTitle, nameOnStorage, videoUrl,
                onSelectFileClick, onSelectVideoClick, showVideo } = this.props;
        // const { lectures } = subject;
        // currentLecture = !!currentLecture && isEmptyObject(currentLecture) ? lectures[lectureID] : currentLecture;

        return (
            <>
                {/*<Form onSubmit={ this.handleSubmit }>*/}
                    { this.renderActionsComponent() }

                    <Grid columns={ 3 }>
                        <Grid.Column width={ 3 }>
                            { this.renderLecturesMenu() }
                        </Grid.Column>

                        <Grid.Column width={ 10 }>
                            {/* TODO: add proper routes for tutor VS student view */ }
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
                                    // onLectureTitleChange={ this.onLectureTitleChange }
                                    // onSelectVideoClick={ this.onSelectVideoClick }
                                    // onSelectFileClick={ this.onSelectFileClick }
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
                                    // onSelectVideoClick={ this.onSelectVideoClick }
                                    // onSelectFileClick={ this.onSelectFileClick }
                                    nameOnStorage={ nameOnStorage }
                                    videoUrl={ videoUrl }
                                    showVideo={ showVideo }
                                    // showVideo={ this.showFirstVideoOfLecture }
                                />
                            ) }
                        </Grid.Column>
                    </Grid>
                {/*</Form>*/}
            </>
        );
    }
}


LecturePageTutorView.propTypes = {
    lectureTitle: PropTypes.string.isRequired,
    lecture: PropTypes.object.isRequired,
};

// const mapStateToProps = (state) => ( {} );
//
// const mapDispatchToProps = {
//     // saveSubject,
// };

export { LecturePageTutorView };
// export default connect(mapStateToProps, mapDispatchToProps)(LecturePageTutorView);
