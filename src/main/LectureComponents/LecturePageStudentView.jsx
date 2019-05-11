import React, { Component } from 'react';
import { Grid, Segment, Menu, Dropdown } from 'semantic-ui-react';
import RatingComponent from '../RatingComponent/RatingComponent';
import OverviewContent from './OverviewContent';
import LectureBodyContent from './LectureBodyContent';
import { LaMaSColours } from '../../utils/colourPalettes';
import '../pages/LecturePage.css';


class LecturePageStudentView extends Component {
    handleBookmarkSubject = (e) => {
        // TODO: add action to POST a request to bookmark this subject
        console.log('Not yet implemented!', e.target.value);
    };

    renderActionsDropdown = () => {
        const { t } = this.props;
        const bookmark = window.location.pathname.replace('/courses/', '');

        return (
            <Dropdown id="dropdown-lecture" button className="icon" floating labeled icon="student" additionPosition="bottom" direction="left" text={ t('menu.actions') }>
                <Dropdown.Menu>
                    <Dropdown.Item value={ bookmark } onClick={ this.handleBookmarkSubject } disabled>
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
                    <Grid.Column floated="left" width={ 4 } verticalAlign={ 'middle' }>
                        { this.renderRatingComponent() }
                        { breadcrumbComponent() }
                    </Grid.Column>
                    <Grid.Column floated="right" width={ 3 }>
                        <Menu.Menu id="top-menu-lecture" position="right">
                            { this.renderActionsDropdown() }
                        </Menu.Menu>
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    };

    renderLecturesMenu = () => {
        const { t, subject, lectureId, handleOverviewMenuClick, handleLectureMenuClick } = this.props;
        const { lectures } = subject;

        return (
            <Menu fluid vertical tabular>
                <Menu.Item
                    color={ LaMaSColours['public-lecture-active-student'] }
                    className={ 'public-lecture-student' }
                    name={ t('baseLayout.overview') }
                    id={ 0 }
                    key={ 0 }
                    active={ lectureId === "0" }
                    onClick={ handleOverviewMenuClick }
                />
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
                    ) : (
                               ''
                           );
                }) }
            </Menu>
        );
    };

    renderRatingComponent = () => {
        const { t } = this.props;
        return (
            <RatingComponent
                currentRating={ this.props.currentRating }
                t={ t }
                addRating={ this.props.addRating }
                subject_id={ this.props.subject.subject_id }
                userId={ this.props.user.userCredentials.uid }
                userRating={ this.props.subject.subject_rates[this.props.user.userCredentials.uid] }
            />
        );
    };

    renderOverviewContent = () => {
        const { t, subject, subject_full_name, subject_id, lectureId } = this.props;

        return (
            <Grid.Column width={ 10 }>
                <OverviewContent
                    key={ subject_id + '-' + lectureId }
                    t={ t }
                    subject_full_name={ subject_full_name }
                    overview={ subject.overview }
                />
            </Grid.Column>
        );
    };

    renderLectureContent = () => {
        const { t, subject, subject_id, lecture, lectureId, lectureTitle, nameOnStorage, videoUrl, onSelectFileClick, onSelectVideoClick, showVideo } = this.props;

        return (
            <Grid.Column width={ 10 }>
                <LectureBodyContent
                    key={ subject_id + '-' + lectureId }
                    t={ t }
                    lectureId={ lectureId }
                    subject={ subject }
                    lecture={ lecture }
                    lectureTitle={ lectureTitle }
                    onSelectVideoClick={ onSelectVideoClick }
                    onSelectFileClick={ onSelectFileClick }
                    nameOnStorage={ nameOnStorage }
                    videoUrl={ videoUrl }
                    showVideo={ showVideo }
                />
            </Grid.Column>
        );
    };

    render() {
        const { lectureId } = this.props;

        return (
            <>
                { this.renderActionsComponent() }

                <Grid columns={ 3 }>
                    <Grid.Column width={ 3 }>{ this.renderLecturesMenu() }</Grid.Column>
                    { lectureId === "0" && this.renderOverviewContent() }
                    { lectureId !== "0" && this.renderLectureContent() }
                </Grid>
            </>
        );
    }
}


export default LecturePageStudentView;
