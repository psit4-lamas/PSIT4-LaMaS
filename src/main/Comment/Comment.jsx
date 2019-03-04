import React, { useState } from 'react';

const Comment = ({ saveMessage }) => {
    const [value, setValue] = useState('');

    return (
        <form
            onSubmit={ (event) => {
                event.preventDefault();
                saveMessage(value);
                setValue('');
            } }
        >
            <input
                onChange={ (event) => setValue(event.target.value) }
                value={ value }
            />
        </form>
    );
};

export default Comment;
