import React, { Component } from 'react';
import { selectLecture, loadSubject, saveSubject, fetchFile, addRating, loadComments, saveComment } from '../actions';
import { withRouterAndRedux, isEmptyObject } from '../../utils';
import { Breadcrumb } from 'semantic-ui-react';
import LoadingPage from '../pages/LoadingPage';
import LecturePageStudentView from '../LectureComponents/LecturePageStudentView';
import LecturePageTutorView from '../LectureComponents/LecturePageTutorView';
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
            lectureName: '',
            videoUrl: '',
            nameOnStorage: '',
            commentsLoaded: false,
        };

        // Load the requested subject immediately on LecturePage construction
        const { subject_id } = props.match.params;
        this.props.loadSubject(subject_id);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.videoUrl === '') {
            this.showFirstVideoOfLecture(this.state.lectureID);
        }

        if (!this.state.commentsLoaded && !this.state.isLoadingSubject) {
            const { subject_id } = prevProps.match.params;
            this.unsubscribe = prevProps.loadComments(subject_id, this.state.lectureID);
            this.setState({ commentsLoaded: true });
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const lectureID = prevState.lectureID;
        const currentLecture = nextProps.currentSubject.lectures[lectureID];
        const lectureName = currentLecture.name;

        return {
            isLoadingSubject: false,
            subject: nextProps.currentSubject,
            currentLecture: currentLecture,
            lectureName,
        };
    }

    handleLectureMenuClick = (e) => {
        const lectureID = e.target.id;
        if (this.unsubscribe) {
            this.unsubscribe();
        }

        this.props.selectLecture(lectureID);

        const { subject } = this.state;
        let currentLecture = subject.lectures[lectureID];
        currentLecture.comments = [];

        this.setState({
            lectureID: lectureID,
            currentLecture: currentLecture,
            lectureName: currentLecture.name || '',
            videoUrl: '',
            nameOnStorage: '',
            commentsLoaded: false,
        });

        this.showFirstVideoOfLecture(lectureID);
    };

    // handleSaveLecture = () => {
    //     this.props.saveSubject(this.state.subject)
    //         .then((response) => {
    //             if (response.message && response.message.includes('success')) {
    //                 this.setState({
    //                     isEditMode: false,
    //                     mode: 'view',
    //                 });
    //             }
    //         });
    // };

    onLectureTitleUpdate = (updatedSubject, value) => {
        this.setState({
            subject: updatedSubject,
            lectureName: value,
        });
    };

    showFirstVideoOfLecture = (lectureID) => {
        const { subject } = this.state;
        const currentLecture = subject.lectures[lectureID];
        const nameOnStorage = Object.keys(currentLecture.videos).length > 0 ? currentLecture.videos.videos_00.nameOnStorage : '';

        if (nameOnStorage) {
            this.showVideo(nameOnStorage);
        }
    };

    showVideo = (nameOnStorage) => {
        this.props.fetchFile(nameOnStorage).then((videoUrl) => {
            this.setState({
                nameOnStorage: nameOnStorage,
                videoUrl: videoUrl,
            });
        });
    };

    saveComment = (comment) => {
        this.props.saveComment(this.state.subject.subject_id, this.state.lectureID, this.props.user, comment);
    };

    onSelectVideoClick = (nameOnStorage) => {
        this.showVideo(nameOnStorage);
    };

    onSelectFileClick = (nameOnStorage) => {
        this.props.fetchFile(nameOnStorage).then((fileUrl) => {
            window.open(fileUrl);
        });
    };

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    renderBreadcrumb = () => {
        const { subject, lectureID } = this.state;
        const { t } = this.props;
        let lectureEnum = '-' + lectureID.substring(lectureID.length - 2, lectureID.length);
        lectureEnum = lectureEnum.replace('-0', '').replace('-', '');
        const currentPage = t('baseLayout.lecture') + lectureEnum;

        return (
            <Breadcrumb>
                <Breadcrumb.Section link>Home</Breadcrumb.Section>
                <Breadcrumb.Divider/>
                <Breadcrumb.Section link>{ subject.subject_name }</Breadcrumb.Section>
                <Breadcrumb.Divider/>
                <Breadcrumb.Section active>{ currentPage }</Breadcrumb.Section>
            </Breadcrumb>
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

        const { lectureID, lectureName, nameOnStorage, videoUrl } = this.state;
        let { currentLecture } = this.state;

        const { t, subject_id, isStudent } = this.props;
        const { lectures } = subject;
        currentLecture = !!currentLecture && isEmptyObject(currentLecture) ? lectures[lectureID] : currentLecture;
        let lectureTitle = '-' + lectureID.substring(lectureID.length - 2, lectureID.length);
        lectureTitle = lectureTitle.replace('-0', '').replace('-', '');
        let comments = currentLecture.comments;

        return (
            <>
                { !isStudent && (
                    <LecturePageTutorView
                        lectureName={ lectureName }
                        onLectureTitleUpdate={ this.onLectureTitleUpdate }
                        saveSubject={ this.props.saveSubject }
                        handleLectureMenuClick={ this.handleLectureMenuClick }
                        breadcrumbComponent={ this.renderBreadcrumb }
                        subject_id={ subject_id }
                        key={ subject_id + '-' + lectureID }
                        t={ t }
                        lectureId={ lectureID }
                        subject={ subject }
                        lecture={ currentLecture }
                        lectureTitle={ lectureTitle }
                        onSelectVideoClick={ this.onSelectVideoClick }
                        onSelectFileClick={ this.onSelectFileClick }
                        nameOnStorage={ nameOnStorage }
                        videoUrl={ videoUrl }
                        showVideo={ this.showFirstVideoOfLecture }
                        comments={ comments }
                        saveComment={ this.saveComment }
                    />
                ) }

                { isStudent && (
                    <LecturePageStudentView
                        handleLectureMenuClick={ this.handleLectureMenuClick }
                        breadcrumbComponent={ this.renderBreadcrumb }
                        subject_id={ subject_id }
                        key={ subject_id + '-' + lectureID }
                        t={ t }
                        lectureId={ lectureID }
                        subject={ subject }
                        lecture={ currentLecture }
                        lectureTitle={ lectureTitle }
                        onSelectVideoClick={ this.onSelectVideoClick }
                        onSelectFileClick={ this.onSelectFileClick }
                        nameOnStorage={ nameOnStorage }
                        videoUrl={ videoUrl }
                        showVideo={ this.showFirstVideoOfLecture }
                        addRating={ this.props.addRating }
                        currentRating={ this.props.currentRating }
                        user={ this.props.user }
                        comments={ comments }
                        saveComment={ this.saveComment }
                    />
                ) }
            </>
        );
    }
}


const mapStateToProps = (state) => ( {
    user: state.user,
    currentSubject: state.subject.currentSubject,
    subject_id: state.subject.subject_id,
    currentRating: state.subject.currentSubject.averageRating,
} );

const mapDispatchToProps = {
    selectLecture,
    loadSubject,
    saveSubject,
    fetchFile,
    addRating,
    loadComments,
    saveComment,
};

export { LecturePage };
export default withRouterAndRedux(mapStateToProps, mapDispatchToProps, LecturePage);
