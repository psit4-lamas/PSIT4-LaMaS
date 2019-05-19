import React from 'react';

const Error403 = ({ t, location }) => (
    <div>
        <h2>Error 403 - Forbidden</h2>
        <p>
            { t('error403.attemptAccess') }<code>{ location.pageName }</code>{ t('error403.unauthorised') }
        </p>
    </div>
);

export default Error403;
