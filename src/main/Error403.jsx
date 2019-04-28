import React from 'react';

const Error403 = ({ location }) => (
    <div>
        <h2>Error 403 - Forbidden</h2>
        <p>
            You are attempting to access <code>{ location.pageName }</code>,
            but you are not authorised to view this page.
        </p>
    </div>
);

export default Error403;
