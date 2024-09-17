import React, { useCallback, useContext, useEffect } from 'react'
import App, { AppContext } from '../App';

function Controls() {

    const { board, setBoard, currAttempt, setCurrAttempt, selectedKeys, setSelectedKeys, correctChord } = useContext(AppContext);

    const handleKeyboard = useCallback((event) => {
        if (event.key === "Enter") {
            submitGuess();
        } else if (event.key === "Backspace") {
            deleteKey();
        }
    })

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);

        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        };
    }, [handleKeyboard]);

    const deleteKey = () => {
        if (currAttempt.notePos === 0) return;

        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.notePos -1] = "";
        setBoard(newBoard)

        const newSelectedKeys = [...selectedKeys];
        newSelectedKeys.pop();
        setSelectedKeys(newSelectedKeys);

        setCurrAttempt({...currAttempt, notePos: currAttempt.notePos - 1});
    }

    const submitGuess = () => {
        if (currAttempt.notePos !== 5) return;
        setCurrAttempt({ attempt: currAttempt.attempt + 1, notePos: 0});
        setSelectedKeys([])
    }

    const referenceTone = () => {
        const audioKey = "C4"
        const noteAudio = document.getElementById(audioKey);
        if (noteAudio) {
            noteAudio.currentTime = 0.0;
            noteAudio.play();
        }
    }

    const playChord = () => {
        const noteFiles = correctChord.map(note => note.replace('#', 'sharp'));

        noteFiles.forEach(noteFile => {
            const noteAudio = document.getElementById(noteFile);
            if (noteAudio) {
                noteAudio.currentTime = 0.0;
                noteAudio.play();
            }
        })
    }

    let deleteKeyButton = (
        <div className='deleteKey' onClick={deleteKey}>
            delKey
        </div>
    );

    let refCButton = (
        <div className='refC' onClick={referenceTone}>
            refC
        </div>
    );

    let playChordButton = (
        <div className='playChord' onClick={playChord}>
            playChord
        </div>
    );

    let submitGuessButton = (
        <div className='submitGuess' onClick={submitGuess}>
            <img src='/assets/enter_512.png'></img>
            <h2>Enter</h2>
        </div>
    );

    return (
        <div className='controls' onKeyDown={handleKeyboard}>
            {submitGuessButton}
            {refCButton}
            {playChordButton}
            {deleteKeyButton}
        </div>
    )
}

export default Controls