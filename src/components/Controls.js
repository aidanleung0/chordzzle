import React, { useCallback, useContext, useEffect } from 'react'
import App, { AppContext } from '../App';

function Controls() {

    const { board, setBoard, currAttempt, setCurrAttempt, selectedKeys, setSelectedKeys } = useContext(AppContext);

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

    let deleteKeyButton = (
        <div className='deleteKey' onClick={deleteKey}>delKey</div>
    );

    let refCButton = (
        <div className='refC'>refC</div>
    );

    let playChordButton = (
        <div className='playChord'>playChord</div>
    );

    let submitGuessButton = (
        <div className='submitGuess' onClick={submitGuess}>submitGuess</div>
    );

    return (
        <div className='controls' onKeyDown={handleKeyboard}>
            {deleteKeyButton}
            {refCButton}
            {playChordButton}
            {submitGuessButton}
        </div>
    )
}

export default Controls