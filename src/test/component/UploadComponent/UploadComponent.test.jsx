import React from 'react';
import ReactDOM from 'react-dom';
import { create } from 'react-test-renderer';
import UploadComponent from '../../../main/UploadComponent/UploadComponent';
import FileUploader from 'react-firebase-file-uploader';


describe('Upload video', () => {

    let div;
    // let props;
    let propsForVideo,
        propsForLecture,
        propsForExercise;
    let componentVideo,
        componentLecture,
        componentExercise;
    let rootInstance;

    beforeEach(() => {
        div = document.createElement('div');
        // props = { t: (key) => key };
        propsForVideo = { buttonLabel: 'Add video', fileType: 'V' };
        propsForLecture = { buttonLabel: 'Add lecture documents', fileType: 'L' };
        propsForExercise = { buttonLabel: 'Add exercises', fileType: 'E' };

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
        expect(videoUploader.metadata.customMetadata.subject).toEqual('KI');
        expect(videoUploader.metadata.customMetadata.lecture).toEqual(1);
        expect(videoUploader.metadata.customMetadata.type).toEqual('V');
        expect(videoUploader.metadata.customMetadata.originalName).toEqual('myFile');
    });

    it('renders lecture materials uploader with expected props', () => {
        rootInstance = componentLecture.root;
        const lectureUploader = rootInstance.findByType(FileUploader).props;

        expect(lectureUploader.accept).toEqual('*');
        expect(lectureUploader.metadata.customMetadata.subject).toEqual('KI');
        expect(lectureUploader.metadata.customMetadata.lecture).toEqual(1);
        expect(lectureUploader.metadata.customMetadata.type).toEqual('L');
        expect(lectureUploader.metadata.customMetadata.originalName).toEqual('myFile');
    });

    it('renders exercise materials uploader with expected props', () => {
        rootInstance = componentExercise.root;
        const exerciseUploader = rootInstance.findByType(FileUploader).props;

        expect(exerciseUploader.accept).toEqual('*');
        expect(exerciseUploader.metadata.customMetadata.subject).toEqual('KI');
        expect(exerciseUploader.metadata.customMetadata.lecture).toEqual(1);
        expect(exerciseUploader.metadata.customMetadata.type).toEqual('E');
        expect(exerciseUploader.metadata.customMetadata.originalName).toEqual('myFile');
    });

});
