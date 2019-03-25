import React from "react";

const Error404 = ({ location }) => (
    <div>
        <h2>Error 404</h2>
        <h3>
            Not found: <code>{ location.pathname }</code>
        </h3>
    </div>
);

export default Error404;
