import React, { useContext } from 'react';
import App, { AppContext } from '../App';

function Key({ keyVal }) {
    const noteIsFlat = (note) => {
        return note.length > 2;
    }

    const { board, setBoard, currAttempt, setCurrAttempt, addKey, selectedKeys } = useContext(AppContext);
    const selectKey = () => {
        if (currAttempt.notePos > 4 || currAttempt.attempt > 5) return;
        addKey(keyVal);
    }

    let keyClassName = 'key';

    if (noteIsFlat(keyVal)) {
        keyClassName += " flat";
    }

    let key;

    key = (
        <div className={keyClassName} onClick={selectKey}>
            {keyVal.slice(0, -1)}
        </div>
    );


    return key;
}

export default Key