import React, {useContext} from 'react';
import {AppContext} from '../App'

function Note({notePos, attemptVal}) {
    const { board, correctChord, currAttempt } = useContext(AppContext);
    const note = board[attemptVal][notePos].slice(0, -1);

    const correct = correctChord[notePos] === note;
    const almost = !correct && note !== "" && correctChord.includes(note);

    const noteState = 
        currAttempt.attempt > attemptVal && 
        (correct ? "correct" : almost ? "almost" : "error");

    return (
        <div className='note' id={noteState}>
            {note}
        </div>
    )
}

export default Note;