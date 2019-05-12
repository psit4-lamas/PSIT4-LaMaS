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
        const lectureID = '0';

        this.state = {
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
        const { lectureID, videoUrl, commentsLoaded, isLoadingSubject } = this.state;
        if (lectureID!== "0" && videoUrl === '') {
            this.showFirstVideoOfLecture(lectureID);
        }

        if (lectureID !== "0" && !commentsLoaded && !isLoadingSubject) {
            const { subject_id } = prevProps.match.params;
            this.unsubscribe = prevProps.loadComments(subject_id, lectureID);
            this.setState({ commentsLoaded: true });
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const prevLectureID = prevState.lectureID;
        const lectureID = prevLectureID !== "0" ? prevLectureID : 'lecture_01';
        const currentLecture = nextProps.currentSubject.lectures[lectureID];
        const lectureName = currentLecture.name;

        return {
            currentLecture: currentLecture,
            lectureName,
        };
    }

    handleOverviewMenuClick = (e) => {
        const lectureID = e.target.id;
        const { currentSubject } = this.props;

        this.setState({
            lectureID: lectureID,
            currentLecture: currentSubject.overview,
        });
    };

    handleLectureMenuClick = (e) => {
        const lectureID = e.target.id;
        if (this.unsubscribe) {
            this.unsubscribe();
        }

        this.props.selectLecture(lectureID);

        const { currentSubject } = this.props;
        const copiedLecture = Object.assign({}, currentSubject.lectures[lectureID]);
        const currentLecture = {
            name: copiedLecture.name,
            is_public: copiedLecture.is_public,
            videos: { ...copiedLecture.videos },
            lecture_materials: { ...copiedLecture.lecture_materials },
            exercises: { ...copiedLecture.exercises },
            comments: copiedLecture.comments || [],
        };

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

    showFirstVideoOfLecture = (lectureID) => {
        const { currentSubject } = this.props;
        const currentLecture = currentSubject.lectures[lectureID];
        const nameOnStorage = !isEmptyObject(currentLecture) && Object.keys(currentLecture.videos).length > 0
                              ? currentLecture.videos.videos_00.nameOnStorage
                              : '';

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

    onCommentSubmit = (comment, subject_id) => {
        const { lectureID } = this.state;
        const { user } = this.props;
        this.props.saveComment(subject_id, lectureID, user, comment);
    };

    onSelectVideoClick = (nameOnStorage) => {
        if (nameOnStorage) {
            this.showVideo(nameOnStorage);
        }
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
        const { lectureID } = this.state;
        const { t, currentSubject } = this.props;
        let lectureEnum = '-' + lectureID.substring(lectureID.length - 2, lectureID.length);
        lectureEnum = lectureEnum.replace('-0', '').replace('-', '');
        const currentPage = lectureID !== "0" ? t('baseLayout.lecture') + lectureEnum : t('baseLayout.overview');

        return (
            <Breadcrumb>
                <Breadcrumb.Section link>Home</Breadcrumb.Section>
                <Breadcrumb.Divider/>
                <Breadcrumb.Section link>{ currentSubject.subject_name }</Breadcrumb.Section>
                <Breadcrumb.Divider/>
                <Breadcrumb.Section active>{ currentPage }</Breadcrumb.Section>
            </Breadcrumb>
        );
    };

    render() {
        const { isLoadingSubject, currentSubject } = this.props;
        if (isLoadingSubject || (currentSubject.assigned_tutors && currentSubject.assigned_tutors.length === 0)) {
            return (
                <React.Fragment>
                    <LoadingPage />
                </React.Fragment>
            );
        }

        const { lectureID, lectureName, nameOnStorage, videoUrl } = this.state;
        let { currentLecture } = this.state;

        const { t, subject_id, isStudent } = this.props;
        const { lectures } = currentSubject;
        currentLecture = !!currentLecture && isEmptyObject(currentLecture) ? lectures[lectureID] : currentLecture;
        let lectureTitle = '-' + lectureID.substring(lectureID.length - 2, lectureID.length);
        lectureTitle = lectureTitle.replace('-0', '').replace('-', '');
        let comments = currentLecture.comments;

        return (
            <>
                { !isStudent && (
                    <LecturePageTutorView
                        lectureName={ lectureName }
                        saveSubject={ this.props.saveSubject }
                        handleOverviewMenuClick={ this.handleOverviewMenuClick }
                        handleLectureMenuClick={ this.handleLectureMenuClick }
                        breadcrumbComponent={ this.renderBreadcrumb }
                        subject_id={ subject_id }
                        key={ subject_id + '-' + lectureID }
                        t={ t }
                        lectureId={ lectureID }
                        subject_full_name={ currentSubject.subject_full_name }
                        subject={ currentSubject }
                        lecture={ currentLecture }
                        lectureTitle={ lectureTitle }
                        onSelectVideoClick={ this.onSelectVideoClick }
                        onSelectFileClick={ this.onSelectFileClick }
                        nameOnStorage={ nameOnStorage }
                        videoUrl={ videoUrl }
                        showVideo={ this.showFirstVideoOfLecture }
                        comments={ comments }
                        onCommentSubmit={ this.onCommentSubmit }
                    />
                ) }

                { isStudent && (
                    <LecturePageStudentView
                        addRating={ this.props.addRating }
                        currentRating={ this.props.currentRating }
                        user={ this.props.user }
                        handleOverviewMenuClick={ this.handleOverviewMenuClick }
                        handleLectureMenuClick={ this.handleLectureMenuClick }
                        breadcrumbComponent={ this.renderBreadcrumb }
                        subject_id={ subject_id }
                        key={ subject_id + '-' + lectureID }
                        t={ t }
                        lectureId={ lectureID }
                        subject_full_name={ currentSubject.subject_full_name }
                        subject={ currentSubject }
                        lecture={ currentLecture }
                        lectureTitle={ lectureTitle }
                        onSelectVideoClick={ this.onSelectVideoClick }
                        onSelectFileClick={ this.onSelectFileClick }
                        nameOnStorage={ nameOnStorage }
                        videoUrl={ videoUrl }
                        showVideo={ this.showFirstVideoOfLecture }
                        comments={ comments }
                        onCommentSubmit={ this.onCommentSubmit }
                    />
                ) }
            </>
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.user,
    currentSubject: state.subject.currentSubject,
    subject_id: state.subject.subject_id,
    currentRating: state.subject.currentSubject && state.subject.currentSubject.averageRating,
});

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
