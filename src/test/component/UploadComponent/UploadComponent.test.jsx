import React from 'react';
import ReactDOM from 'react-dom';
import { create } from 'react-test-renderer';
import UploadComponent from "../../../main/UploadComponent/UploadComponent";

describe('Upload video', () => {
    let div;
    let propsForVideo, propsForLecture, propsForExercise;
    let componentVideo, componentLecture, componentExercise;
    let rootInstance;

    beforeEach(() => {
        div = document.createElement('div');
        propsForVideo = { buttonLabel: 'Add video' , fileType: 'V' }
        propsForLecture = { buttonLabel: 'Add lecture documents' , fileType: 'L' }
        propsForExercise = { buttonLabel: 'Add exercises' , fileType: 'E' }

        componentVideo = create(<UploadComponent { ...propsForVideo } />);
        componentLecture = create(<UploadComponent { ...propsForLecture } />);
        componentExercise = create(<UploadComponent { ...propsForExercise } />);

        rootInstance = componentVideo.root;
        rootInstance = componentLecture.root;
        rootInstance = componentExercise.root;

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

});
