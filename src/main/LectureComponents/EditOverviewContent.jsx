import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormField, TextArea } from 'semantic-ui-react';
import './LectureBodyContent.css';


class EditOverviewContent extends Component {

    handleTopicsChange = (e) => {
        this.props.onOverviewTopicsChange(e.target.value);
    };

    handleLabsChange = (e) => {
        this.props.onOverviewLabsChange(e.target.value);
    };

    handleExamChange = (e) => {
        this.props.onOverviewExamChange(e.target.value);
    };

    render() {
        const { t, subject } = this.props;
        const { overview } = subject;

        return (
            <>
                <h1>
                    <strong>{ t('subjectOverview.editTitleLabel') }</strong>:
                    <em> { subject.subject_full_name }</em> { ` - ${ t('subjectOverview.suffixTitle') }` }
                </h1>

                <div style={ { marginTop: '25px' } }>
                    <FormField>
                        <label>{ t('subjectOverview.topics') }</label>
                        <TextArea
                            focus="true"
                            name="topics"
                            value={ overview.topics }
                            placeholder={ t('subjectOverview.overviewTopicsPlaceholder') }
                            onChange={ this.handleTopicsChange }
                            style={{ minHeight: 100 }}
                        />
                    </FormField>

                    <FormField>
                        <label>{ t('subjectOverview.labs') }</label>
                        <TextArea
                            name="labs"
                            value={ overview.labs }
                            placeholder={ t('subjectOverview.overviewLabsPlaceholder') }
                            onChange={ this.handleLabsChange }
                            style={{ minHeight: 100 }}
                        />
                    </FormField>

                    <FormField>
                        <label>{ t('subjectOverview.exam') }</label>
                        <TextArea
                            name="exam"
                            value={ overview.exam }
                            placeholder={ t('subjectOverview.overviewExamPlaceholder') }
                            onChange={ this.handleExamChange }
                            style={{ minHeight: 100 }}
                        />
                    </FormField>
                </div>
            </>
        );
    }
}


EditOverviewContent.propTypes = {
    subject: PropTypes.object.isRequired,
    onOverviewTopicsChange: PropTypes.func.isRequired,
    onOverviewLabsChange: PropTypes.func.isRequired,
    onOverviewExamChange: PropTypes.func.isRequired,
};

export default EditOverviewContent;
