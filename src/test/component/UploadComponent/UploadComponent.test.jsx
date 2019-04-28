import React from 'react';
import ReactDOM from 'react-dom';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Progress } from 'semantic-ui-react';
import { UploadComponent, condition } from '../../../main/UploadComponent/UploadComponent';
import FileUploader from 'react-firebase-file-uploader';

describe('upload component', () => {
    let div;
    // let props;
    let propsForVideo, propsForLecture, propsForExercise;
    let componentVideo, componentLecture, componentExercise;
    let rootInstance;

    beforeEach(() => {
        div = document.createElement('div');
        // props = { t: (key) => key };
        propsForVideo = {
            buttonLabel: 'add',
            fileType: 'V',
            lectureId: 'lecture_01',
            subject: { subject_id: 'testId' },
        };
        propsForLecture = {
            buttonLabel: 'add',
            fileType: 'L',
            lectureId: 'lecture_01',
            subject: { subject_id: 'testId' },
        };
        propsForExercise = {
            buttonLabel: 'add',
            fileType: 'E',
            lectureId: 'lecture_01',
            subject: { subject_id: 'testId' },
        };

        componentVideo = create(<UploadComponent { ...propsForVideo } />);
        componentLecture = create(<UploadComponent { ...propsForLecture } />);
        componentExercise = create(<UploadComponent { ...propsForExercise } />);
    });

    it('renders without crashing', () => {
        const uploadCompVideo = <UploadComponent { ...propsForVideo } />;
        const uploadCompLecture = <UploadComponent { ...propsForLecture } />;
        const uploadCompExercise = <UploadComponent { ...propsForExercise } />;

        ReactDOM.render(uploadCompVideo, div);
        ReactDOM.render(uploadCompLecture, div);
        ReactDOM.render(uploadCompExercise, div);

        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders video uploader with expected props', () => {
        rootInstance = componentVideo.root;
        const videoUploader = rootInstance.findByType(FileUploader).props;

        expect(videoUploader.accept).toEqual('video/*');
        expect(videoUploader.metadata.customMetadata.subjectId).toEqual('testId');
        expect(videoUploader.metadata.customMetadata.lecture).toEqual('01');
        expect(videoUploader.metadata.customMetadata.type).toEqual('V');
        expect(videoUploader.metadata.customMetadata.originalName).toEqual('myFile');
    });

    it('renders lecture materials uploader with expected props', () => {
        rootInstance = componentLecture.root;
        const lectureUploader = rootInstance.findByType(FileUploader).props;

        expect(lectureUploader.accept).toEqual('*');
        expect(lectureUploader.metadata.customMetadata.subjectId).toEqual('testId');
        expect(lectureUploader.metadata.customMetadata.lecture).toEqual('01');
        expect(lectureUploader.metadata.customMetadata.type).toEqual('L');
        expect(lectureUploader.metadata.customMetadata.originalName).toEqual('myFile');
    });

    it('renders exercise materials uploader with expected props', () => {
        rootInstance = componentExercise.root;
        const exerciseUploader = rootInstance.findByType(FileUploader).props;

        expect(exerciseUploader.accept).toEqual('*');
        expect(exerciseUploader.metadata.customMetadata.subjectId).toEqual('testId');
        expect(exerciseUploader.metadata.customMetadata.lecture).toEqual('01');
        expect(exerciseUploader.metadata.customMetadata.type).toEqual('E');
        expect(exerciseUploader.metadata.customMetadata.originalName).toEqual('myFile');
    });

    it('renders exercise materials uploader with expected props', () => {
        rootInstance = componentExercise.root;
        const exerciseUploader = rootInstance.findByType(FileUploader).props;

        expect(exerciseUploader.accept).toEqual('*');
        expect(exerciseUploader.metadata.customMetadata.subjectId).toEqual('testId');
        expect(exerciseUploader.metadata.customMetadata.lecture).toEqual('01');
        expect(exerciseUploader.metadata.customMetadata.type).toEqual('E');
        expect(exerciseUploader.metadata.customMetadata.originalName).toEqual('myFile');
    });

    it('sets state isUploading during upload', () => {
        let obj1 = { name: 'originalFileName' };
        let obj2 = {
            metadata_: {
                customMetadata: {
                    originalName: '',
                },
            },
        };
        const component = <UploadComponent { ...propsForVideo } />;

        let uploadComponent = shallow(component);
        uploadComponent.instance().handleUploadStart(obj1, obj2);
        expect(uploadComponent.state('isUploading')).toBeTruthy();
    });

    it('sets state isUploading to false after upload', () => {
        const component = <UploadComponent { ...propsForVideo } />;
        let uploadComponent = shallow(component);
        uploadComponent.instance().setState({ isUploading: true });

        uploadComponent.instance().handleUploadSuccess();

        expect(uploadComponent.state('isUploading')).toBeFalsy();
    });

    it('sets state isUploading to false if error occured', () => {
        const component = <UploadComponent { ...propsForVideo } />;
        let error = {};
        let uploadComponent = shallow(component);
        uploadComponent.instance().setState({ isUploading: true });

        uploadComponent.instance().handleUploadError(error);

        expect(uploadComponent.state('isUploading')).toBeFalsy();
    });

    it('shows progress bar after upload start', () => {
        let obj1 = { name: 'originalFileName' };
        let obj2 = {
            metadata_: {
                customMetadata: {
                    originalName: '',
                },
            },
        };
        const component = <UploadComponent { ...propsForVideo } />;
        let uploadComponent = shallow(component);
        uploadComponent.instance().handleUploadStart(obj1, obj2);

        expect(uploadComponent.find(Progress).length).toEqual(1);
    });

    it('removes progress bar after end of upload', () => {
        const component = <UploadComponent { ...propsForVideo } />;
        let uploadComponent = shallow(component);
        uploadComponent.instance().handleUploadSuccess();

        expect(uploadComponent.find(Progress).length).toEqual(0);
    });

    it('removes upload button after upload start', () => {
        let obj1 = { name: 'originalFileName' };
        let obj2 = {
            metadata_: {
                customMetadata: {
                    originalName: '',
                },
            },
        };
        const component = <UploadComponent { ...propsForVideo } />;
        let uploadComponent = shallow(component);
        uploadComponent.instance().handleUploadStart(obj1, obj2);

        expect(uploadComponent.find(FileUploader).length).toEqual(0);
    });

    it('renders upload button after end of upload', () => {
        const component = <UploadComponent { ...propsForVideo } />;
        let uploadComponent = shallow(component);
        uploadComponent.instance().setState({ isUploading: true });

        uploadComponent.instance().handleUploadSuccess();

        expect(uploadComponent.find(FileUploader).length).toEqual(1);
    });

    it('adds originalFilename to metadata', () => {
        let obj1 = { name: 'originalFileName' };
        let obj2 = {
            metadata_: {
                customMetadata: {
                    originalName: '',
                },
            },
        };
        const component = <UploadComponent { ...propsForVideo } />;
        let uploadComponent = shallow(component);
        uploadComponent.instance().handleUploadStart(obj1, obj2);

        expect(obj2.metadata_.customMetadata.originalName).toEqual(obj1.name);
    });

    it('sets error state if error occures', () => {
        const component = <UploadComponent { ...propsForVideo } />;
        let uploadComponent = shallow(component);
        let error = {};
        uploadComponent.instance().setState({ isUploading: true });

        uploadComponent.instance().handleUploadError(error);

        expect(uploadComponent.state('errorOccurred')).toBeTruthy();
    });

    it('updates progress on update upload ', () => {
        const component = <UploadComponent { ...propsForVideo } />;
        let uploadComponent = shallow(component);
        uploadComponent.instance().handleProgress(10);

        expect(uploadComponent.state('progress')).toBe(10);
    });

    it('condition returns correct values', () => {
        const authUser = { roles: ['TUTOR', 'ADMIN'] };
        const authUserStudent = { roles: ['STUDENT'] };

        expect(condition(authUser)).toBe(true);
        expect(condition(authUserStudent)).toBe(false);
    });
});
