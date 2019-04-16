import React, { Component } from 'react';
import { selectLecture, loadSubject, saveSubject } from '../actions';
import { withRouterAndRedux, isEmptyObject } from '../../utils';
import { Grid, Segment, Menu, Dropdown, Button, Form } from 'semantic-ui-react';
import EditLectureBodyContent from '../LectureComponents/EditLectureBodyContent';
import LectureBodyContent from '../LectureComponents/LectureBodyContent';
import LoadingPage from '../pages/LoadingPage';
import './LecturePage.css';


class LecturePage extends Component {
    constructor(props) {
        super(props);
        const lectureID = 'lecture_01';

        this.state = {
            isLoadingSubject: true,
            subject: {},
            lectureID: lectureID,
            currentLecture: {},
            isEditMode: false,
            mode: 'view',
            lectureName: '',
            isValid: true,
        };
    }

    componentWillMount() {
        const { subject_id } = this.props.match.params;
        this.props.loadSubject(subject_id);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { subject_id } = nextProps.match.params;
        const { currentSubject } = nextProps;
        const lectureID = prevState.lectureID || 'lecture_01';
        const currentLecture = nextProps.currentSubject.lectures[lectureID];
        const lectureName = !!currentSubject && currentSubject.subject_id !== subject_id ? prevState.lectureName || currentLecture.name || '' : currentLecture.name || '';
        return {
            isLoadingSubject: false,
            subject: nextProps.currentSubject,
            currentLecture: currentLecture,
            lectureName,
        };
    }

    handleLectureMenuClick = (e) => {
        this.props.selectLecture(e.target.id);
        const { subject } = this.state;

        const lectureID = e.target.id;
        const currentLecture = subject.lectures[lectureID];

        this.setState({
            lectureID: lectureID,
            currentLecture: currentLecture,
            lectureName: currentLecture.name || '',
        });
    };

    handlePublishLecture = (e) => {
        // TODO: add action to POST a request to publish this lecture
        console.log('Not yet implemented!', e.target.value);
    };

    handleSaveLecture = () => {
        this.props.saveSubject(this.state.subject).then((response) => {
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
        const { subject, lectureID } = this.state;
        subject.lectures[lectureID].name = value;

        this.setState({
            subject: subject,
            lectureName: value,
            isValid: value !== '',
        });
    };

    renderOnViewModeDropdown = () => {
        // TODO: add check for the current lecture is_published: true | false
        const { subject } = this.state;
        const { t } = this.props;

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

        return <Button onClick={ this.handleSaveLecture }>{ t('menu.save') }</Button>;
    };

    renderActionsDropdown = () => {
        const { mode } = this.state;

        return (
            <Segment>
                <Menu.Menu id="top-menu-lecture" position="right">
                    { mode === 'view' ? this.renderOnViewModeDropdown() : this.renderOnEditModeDropdown() }
                </Menu.Menu>
            </Segment>
        );
    };

    render() {
        const { isLoadingSubject, subject } = this.state;

        if (isLoadingSubject) {
            return (
                <React.Fragment>
                    <LoadingPage/>
                </React.Fragment>
            );
        }

        const { lectureID, isEditMode, isValid, lectureName } = this.state;
        let { currentLecture } = this.state;
        const { t } = this.props;
        const { lectures } = subject;
        currentLecture = !!currentLecture && isEmptyObject(currentLecture) ? lectures[lectureID] : currentLecture;
        let lectureTitle = '-' + lectureID.substring(lectureID.length - 2, lectureID.length);
        lectureTitle = lectureTitle.replace('-0', '').replace('-', '');

        return (
            <>
                <Form onSubmit={ this.handleSubmit }>
                    { this.renderActionsDropdown() }

                    <Grid columns={ 3 }>
                        <Grid.Column width={ 3 }>
                            <Menu fluid vertical tabular>
                                { Object.keys(lectures).map((index, key) => (
                                    <Menu.Item
                                        name={ t('baseLayout.lecture') + ( key + 1 ) }
                                        id={ index }
                                        key={ index }
                                        active={ lectureID === index }
                                        onClick={ this.handleLectureMenuClick }
                                    />
                                )) }
                            </Menu>
                        </Grid.Column>

                        <Grid.Column width={ 10 }>
                            {/* TODO: add proper routes for tutor VS student view */ }
                            { isEditMode && (
                                <EditLectureBodyContent
                                    t={ t }
                                    subject={ subject }
                                    lecture={ currentLecture }
                                    lectureTitle={ lectureTitle }
                                    lectureName={ lectureName }
                                    isValid={ isValid }
                                    onLectureTitleChange={ this.onLectureTitleChange }
                                />
                            ) }
                            { !isEditMode && <LectureBodyContent t={ t } subject={ subject } lecture={ currentLecture } lectureTitle={ lectureTitle }/> }
                            {/*<Route exact path={ `${ this.props.base }/:subj` } render={ ({ match }) => <LectureBodyContent match={ match }/> }/>*/ }
                        </Grid.Column>
                    </Grid>
                </Form>
            </>
        );
    }
}


const mapStateToProps = (state) => ( {
    user: state.user,
    currentSubject: state.subject.currentSubject,
} );

const mapDispatchToProps = {
    selectLecture,
    loadSubject,
    saveSubject,
};

export { LecturePage };
export default withRouterAndRedux(mapStateToProps, mapDispatchToProps, LecturePage);
