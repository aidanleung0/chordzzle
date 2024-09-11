import React from 'react';

function Key({ keyVal }) {
    const noteIsFlat = (note) => {
        return note.length > 2;
    }

    let keyClassName = 'key';

    if (noteIsFlat(keyVal)) {
        keyClassName += " flat";
    }

    let key;
    if (noteIsFlat(keyVal)) {
        key = (
            <div className={keyClassName}>
                {keyVal.slice(0, -1)}
            </div>
        );
    } else {
        key = (
            <div className={keyClassName}>
                <div className='key-text'>
                    {keyVal.slice(0, -1)}
                </div>
            </div>
        );
    }

    return key;
}

export default Key