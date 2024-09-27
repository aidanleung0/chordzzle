import React, { useCallback, useContext, useEffect } from 'react'
import App, { AppContext } from '../App';

function Controls() {

    const { board, setBoard, currAttempt, setCurrAttempt, selectedKeys, setSelectedKeys, correctChord, stats, setStats, viewStats, setViewStats, isWin, setIsWin, endGame, setGameOver } = useContext(AppContext);

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

    const checkGameOver = (isCorrect) => {
        let newStats = { ...stats };

        if (isCorrect) {
            newStats.wins += 1;
            newStats.currentStreak += 1;
            if (newStats.currentStreak > newStats.maxStreak) {
                newStats.maxStreak = newStats.currentStreak;
            }
        } else if (currAttempt.attempt === 5) {
            newStats.losses += 1;
            newStats.currentStreak = 0;
        }

        newStats.gamesPlayed += 1;
        newStats.winPercentage = Math.floor((newStats.wins / newStats.gamesPlayed) * 100)
        newStats.attemptDist[currAttempt.attempt] += 1;
        localStorage.setItem('chordzzleStats', JSON.stringify(newStats));
        setStats(newStats);
        endGame();
    };

    const submitGuess = () => {
        if (currAttempt.notePos !== 5) return;

        const correctChordOctaveless = correctChord.map(str => str.slice(0, -1));
        const guessChord = selectedKeys.map(key => key.slice(0, -1));

        const newBoard = [...board];

        guessChord.forEach((note, index) => {
            if (note === correctChordOctaveless[index]) {
                newBoard[currAttempt.attempt][index] = { note: selectedKeys[index], state: 'correct' };
            } else if (correctChordOctaveless.includes(note)) {
                newBoard[currAttempt.attempt][index] = { note: selectedKeys[index], state: 'almost' };
            } else {
                newBoard[currAttempt.attempt][index] = { note: selectedKeys[index], state: 'error' };
            }
        });

        const isCorrect = selectedKeys.every((note, index) => note.slice(0, -1) === correctChordOctaveless[index]);
        setCurrAttempt({ attempt: currAttempt.attempt + 1, notePos: 0});
        setSelectedKeys([]);
        if (isCorrect) {
            setIsWin(true);
            checkGameOver(true);
        } else if (currAttempt.attempt === 5) {
            checkGameOver(false);
        }
    };

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
            <img src='/assets/delete_512.png'></img>
        </div>
    );

    let refCButton = (
        <div className='refC' onClick={referenceTone}>
            <img src='/assets/note_512.png'></img>
        </div>
    );

    let playChordButton = (
        <div className='playChord' onClick={playChord}>
            <img src='/assets/play_512.png'></img>
        </div>
    );

    let submitGuessButton = (
        <div className='submitGuess' onClick={submitGuess}>
            <img src='/assets/enter_512.png'></img>
        </div>
    );

    return (
        <div className='controls' onKeyDown={handleKeyboard}>
            {refCButton}
            {playChordButton}
            {submitGuessButton}
            {deleteKeyButton}
        </div>
    )
}

export default Controls