import React, { Component } from 'react';
import { withNameSpacesAndRouterAndRedux } from '../../utils';
import UploadMediaPage from '../pages/UploadMediaPage';
import './LectureBodyContent.css';


class LectureBodyContent extends Component {
    // TODO: improve lecture body content UI (Sprint 2)
    render() {
        const { lecture, t } = this.props;

        return (
            <div>
                <h1>{ lecture.name }</h1>
                <UploadMediaPage t={ t }/>
            </div>
        );
    }
}


const mapStateToProps = (state) => ( {
    lecture: state.subject.currentSubject.lectures[state.subject.currentLectureID],
} );

const mapDispatchToProps = {};

export { LectureBodyContent };
export default withNameSpacesAndRouterAndRedux(mapStateToProps, mapDispatchToProps, LectureBodyContent);
