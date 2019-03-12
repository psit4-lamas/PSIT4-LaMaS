import React, { Component } from 'react';
import { Placeholder } from 'semantic-ui-react';
import './LectureBodyContent.css';


class LectureBodyContent extends Component {

    // TODO: improve lecture body content UI (Sprint 2)
    render() {
        console.log('Lecture page');
        const { subj } = this.props.match.params;

        return (
            <div>
                <h1>{ subj }</h1>

                <Placeholder>
                    <Placeholder.Header image>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                    </Placeholder.Paragraph>
                </Placeholder>
            </div>
        );
    }
}


export default LectureBodyContent;
