import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { selectLecture, fetchFile } from '../actions';
import { Grid, Segment, Menu, Dropdown } from 'semantic-ui-react';
import LectureBodyContent from './LectureBodyContent';
import { LaMaSColours } from '../../utils/colourPalettes';
import '../pages/LecturePage.css';


class LecturePageStudentView extends Component {

    // constructor(props) {
    //     super(props);
    //     const lectureID = 'lecture_01';
    //
    //     this.state = {
    //         subject: {},
    //         lectureID: lectureID,
    //         currentLecture: {},
    //         lectureName: '',
    //         videoUrl: '',
    //         nameOnStorage: '',
    //     };
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.videoUrl ==='') {
    //         this.showFirstVideoOfLecture(this.state.lectureID);
    //     }
    // }

    // handleLectureMenuClick = (e) => {
    //     this.props.selectLecture(e.target.id);
    //     const { subject } = this.state;
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

    handleBookmarkSubject = (e) => {
        // TODO: add action to POST a request to bookmark this subject
        console.log('Not yet implemented!', e.target.value);
    };

    // showFirstVideoOfLecture = (lectureID) => {
    //     const { subject } = this.state;
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

    // onSelectVideoClick = (nameOnStorage) => {
    //     this.showVideo(nameOnStorage);
    // };
    //
    // onSelectFileClick = (nameOnStorage) => {
    //     this.props.fetchFile(nameOnStorage).then((fileUrl) => {
    //         window.open(fileUrl);
    //     });
    // };

    // renderBreadcrumb = () => {
    //     const { subject, lectureID } = this.state;
    //     const { t } = this.props;
    //     let lectureEnum = '-' + lectureID.substring(lectureID.length - 2, lectureID.length);
    //     lectureEnum = lectureEnum.replace('-0', '').replace('-', '');
    //     const currentPage = t('baseLayout.lecture') + lectureEnum;
    //
    //     return (
    //         <Breadcrumb>
    //             <Breadcrumb.Section link>Home</Breadcrumb.Section>
    //             <Breadcrumb.Divider />
    //             <Breadcrumb.Section link>{ subject.subject_name }</Breadcrumb.Section>
    //             <Breadcrumb.Divider />
    //             <Breadcrumb.Section active>{ currentPage }</Breadcrumb.Section>
    //         </Breadcrumb>
    //     );
    // };

    renderActionsDropdown = () => {
        // TODO: add check for the current lecture is_published: true | false
        const { t } = this.props;
        const bookmark = window.location.pathname.replace('/courses/', '');

        return (
            <Dropdown id="dropdown-lecture" button className="icon" floating labeled icon="student"
                      additionPosition="bottom" direction="left" text={ t('menu.actions') }>
                <Dropdown.Menu>
                    <Dropdown.Item value={ bookmark } onClick={ this.onModeChange } disabled>
                        { t('menu.bookmarkSubject') }
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    renderActionsComponent = () => {
        const { breadcrumbComponent } = this.props;

        return (
            <Segment>
                <Grid columns={ 2 }>
                    <Grid.Column floated='left' width={ 4 } verticalAlign={ 'middle' }>
                        { breadcrumbComponent() }
                    </Grid.Column>
                    <Grid.Column floated='right' width={ 3 }>
                        <Menu.Menu id="top-menu-lecture" position="right">
                            { this.renderActionsDropdown() }
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
                { Object.keys(lectures).map((index, key) => {
                    const is_public = lectures[index].is_public;
                    return is_public ? (
                        <Menu.Item
                            color={ LaMaSColours['public-lecture-active-student'] }
                            className={ 'public-lecture-student' }
                            name={ t('baseLayout.lecture') + ( key + 1 ) }
                            id={ index }
                            key={ index }
                            active={ lectureId === index }
                            onClick={ handleLectureMenuClick }
                        />
                    ) : '';
                }) }
            </Menu>
        );
    };

    render() {

        // const { lectureID, lectureName, nameOnStorage, videoUrl } = this.state;
        // let { currentLecture } = this.state;

        const { t, subject, subject_id, lecture, lectureId, lectureTitle, nameOnStorage, videoUrl } = this.props;
        const { onSelectFileClick, onSelectVideoClick, showVideo } = this.props;
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
                            <LectureBodyContent
                                key={ subject_id + '-' + lectureId }
                                t={ t }
                                lectureId={ lectureId }
                                subject={ subject }
                                lecture={ lecture }
                                lectureTitle={ lectureTitle }
                                onSelectVideoClick={ onSelectVideoClick }
                                // onSelectVideoClick={ this.onSelectVideoClick }
                                onSelectFileClick={ onSelectFileClick }
                                // onSelectFileClick={ this.onSelectFileClick }
                                nameOnStorage={ nameOnStorage }
                                videoUrl={ videoUrl }
                                showVideo={ showVideo }
                                // showVideo={ this.showFirstVideoOfLecture }
                            />
                        </Grid.Column>
                    </Grid>
                {/*</Form>*/}
            </>
        );
    }
}

//
// const mapStateToProps = (state) => ( {} );
//
// const mapDispatchToProps = {
//     // selectLecture,
//     // fetchFile,
// };
//
export { LecturePageStudentView };
// export default connect(mapStateToProps, mapDispatchToProps)(LecturePageStudentView);
export default LecturePageStudentView;
