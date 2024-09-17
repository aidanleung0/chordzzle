import React, { useContext, useEffect, useState } from 'react';
import {AppContext} from '../App'

function Note({notePos, attemptVal}) {
    const { board, correctChord, currAttempt } = useContext(AppContext);
    const note = board[attemptVal][notePos].slice(0, -1);
    const correctChordOctaveless = correctChord.map(str => str.slice(0, -1));
    const [noteState, setNoteState] = useState("");


    useEffect(() => {
        const checkNoteState = () => {
            const guessChord = board[attemptVal].map(note => note.slice(0, -1));
            const tempCorrectChord = [...correctChordOctaveless];

            let correctCount = Array(correctChordOctaveless.length).fill(false);
            let almostCount = Array(correctChordOctaveless.length).fill(false);

            for (let i = 0; i < correctChordOctaveless.length; i++) {
                if (guessChord[i] === tempCorrectChord[i]) {
                    correctCount[i] = true;
                    tempCorrectChord[i] = null;
                }
            }

            for (let i = 0; i < guessChord.length; i++) {
                if (!correctCount[i] && tempCorrectChord.includes(guessChord[i])) {
                    let index = tempCorrectChord.indexOf(guessChord[i]);
                    almostCount[i] = true;
                    tempCorrectChord[index] = null;
                }
            }

            if (correctCount[notePos]) {
                setNoteState("correct");
            } else if (almostCount[notePos]) {
                setNoteState("almost");
            } else {
                setNoteState("error");
            }
        };

        if (currAttempt.attempt > attemptVal) {
            checkNoteState();
        }
    }, [board, correctChordOctaveless, currAttempt, notePos, attemptVal]);

    return (
        <div className='note' id={noteState}>
            {note}
        </div>
    );
}

export default Note;