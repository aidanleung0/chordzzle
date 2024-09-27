import React, { useContext, useEffect, useState } from 'react';
import {AppContext} from '../App'

function Note({notePos, attemptVal}) {
    const { board, correctChord, currAttempt } = useContext(AppContext);
    const noteObj = board[attemptVal][notePos];
    const note = noteObj.note;
    const noteState = noteObj.state;


    return (
        <div className='note' id={noteState}>
            {note}
        </div>
    );
}

export default Note;