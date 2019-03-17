import React, { Component } from 'react';
import { Placeholder } from 'semantic-ui-react';
import './LectureBodyContent.css';


class LectureBodyContent extends Component {

    // TODO: improve lecture body content UI (Sprint 2)
    render() {
        const { pathname } = this.props;

        return (
            <div>
                <h1>{ pathname }</h1>

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
