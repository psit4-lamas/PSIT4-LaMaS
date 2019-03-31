import React, { Component } from 'react';
import { withNameSpacesAndRouterAndRedux } from '../../utils';
import UploadMediaPage from '../pages/UploadMediaPage';
import './LectureBodyContent.css';


class LectureBodyContent extends Component {
    // TODO: improve lecture body content UI (Sprint 2)
    render() {
        const { lecture } = this.props;

        return (
            <div>
                <h1>{ lecture.name }</h1>
                <UploadMediaPage/>
            </div>
        );
    }
}


const mapStateToProps = (state) => ( {
    lecture: state.subject.currentSubject.lectures[state.subject.currentLectureID],
} );

const mapDispatchToProps = {};

export default withNameSpacesAndRouterAndRedux(mapStateToProps, mapDispatchToProps, LectureBodyContent);
