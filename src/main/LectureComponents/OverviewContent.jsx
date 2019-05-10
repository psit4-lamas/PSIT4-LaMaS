import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LectureBodyContent.css';


class OverviewContent extends Component {
    render() {
        const { t, subject, overview } = this.props;

        return (
            <>
                <h1>
                    <em>{ subject.subject_full_name }</em> { ` - ${ t('subjectOverview.suffixTitle') }` }
                </h1>

                <div style={ { marginTop: '25px' } }>
                    <h3>{ t('subjectOverview.topics') }</h3>
                    <p>{ overview.topics }</p>
                    <br/>

                    <h3>{ t('subjectOverview.labs') }</h3>
                    <p>{ overview.labs }</p>
                    <br/>

                    <h3>{ t('subjectOverview.exam') }</h3>
                    <p>{ overview.exam }</p>
                    <br/>
                </div>
            </>
        );
    }
}


OverviewContent.propTypes = { // NOSONAR
    overview: PropTypes.object.isRequired,
};

export { OverviewContent };
export default OverviewContent;
