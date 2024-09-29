import './App.css';
import './mediaqueries.css'
import Board from './components/Board';
import Controls from './components/Controls';
import Piano from './components/Piano';
import { createContext, useState, useEffect } from 'react';
import Modal from 'react-modal';
import { boardDefault } from './Chords';

export const AppContext = createContext();

function App() {
    const [board, setBoard] = useState(boardDefault);
    const [currAttempt, setCurrAttempt] = useState({ attempt: 0, notePos: 0 });
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [viewRules, setViewRules] = useState(false);
    const [viewStats, setViewStats] = useState(false);
    const [isWin, setIsWin] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [timeRemaning, setTimeRemaining] = useState('');

    const [stats, setStats] = useState({
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        winPercentage: 0,
        currentStreak: 0,
        maxStreak: 0,
        attemptDist: [0, 0, 0, 0, 0, 0]
    });

    const [dailyChord, setDailyChord] = useState(null);
    const [correctChord, setCorrectChord] = useState([]);

    const keys = ["C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
        "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
    "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5", "C6"];

    const addKey = (key) => {
        const audioKey = key.replace('#', 'sharp');
        const noteAudio = document.getElementById(audioKey);
        if (noteAudio) {
            noteAudio.currentTime = 0.0;
            noteAudio.play();
            setTimeout(() => {
                noteAudio.pause();        // Pause the audio after 3 seconds
                noteAudio.currentTime = 0; // Reset the audio to the beginning
            }, 1500);
        }
        
        if (selectedKeys.length === 5) return;
        if (selectedKeys.includes(key)) return;
        const updatedKeys = [...selectedKeys, key];
        
        updatedKeys.sort((a, b) => keys.indexOf(a) - keys.indexOf(b));

        setSelectedKeys(updatedKeys);

        const newBoard = [...board];
        updatedKeys.forEach((selectedKey, index) => {
            newBoard[currAttempt.attempt][index] = {note: selectedKey.slice(0, -1), state: ''};
        });

        setBoard(newBoard);
        setCurrAttempt({ ...currAttempt, notePos: updatedKeys.length });
    };

    const initializeStats = () => {
        const storedStats = JSON.parse(localStorage.getItem('chordzzleStats')) || {
            gamesPlayed: 0,
            wins: 0,
            losses: 0,
            winPercentage: 0,
            currentStreak: 0,
            maxStreak: 0,
            attemptDist: [0, 0, 0, 0, 0, 0]
        };

        setStats(storedStats);
        localStorage.setItem('chordzzleStats', JSON.stringify(storedStats));
    };

    const checkFirstVisit = () => {
        const visited = localStorage.getItem('alreadyVisited');

        if (!visited) {
            setViewRules(true);
            localStorage.setItem('alreadyVisited', true);
        }
    };

    useEffect(() => {
        initializeStats();
        checkFirstVisit();

        const fetchDailyChord = async () => {
            try {
                const response = await fetch('https://chordzzle.uw.r.appspot.com/api/daily-chord/');
                const data = await response.json();
                setDailyChord(data);
                setCorrectChord(data.notes.split(' '));
            } catch (error) {
                console.error('Error fetching daily chord:', error);
            }
        };

        const updateTimeRemaining = () => {
            const now = new Date();
            const nextMidnight = new Date(now);
            nextMidnight.setHours(24, 0, 0, 0);

            const timeDiff = nextMidnight - now;
            const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
            const seconds = Math.floor((timeDiff / (1000)) % 60);

            setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
        }
        fetchDailyChord();
        const timerId = setInterval(updateTimeRemaining, 1000);

        return () => clearInterval(timerId);
        

    }, []);

    const closeRules = () => {
        setViewRules(false);
    };

    const openRules = () => {
        setViewRules(true);
    };
    
    const closeStats = () => {
        setViewStats(false);
    };

    const openStats = () => {
        setViewStats(true);
    };

    const endGame = () => {
        setGameOver(true);
        setViewStats(true);
    };

    const calculateBarWidth = (count, maxCount) => {
        return (count / maxCount) * 100;
    };

    const getEmojiForResult = (attempt) => {
        return attempt.map((noteState) => {
            
            if (noteState === 'correct') {
                return '🟩';
            } else if (noteState === 'almost') {
                return '🟨';
            } else {
                return '⬛';
            }
        }).join('');
    };
    
    const shareResults = () => {
        const attempts = currAttempt.attempt; 
        console.log(board)
        const resultLines = board.slice(0, currAttempt.attempt).map(attempt => {
            const attemptState = attempt.map(note => note.state); // Extract the note states
            return getEmojiForResult(attemptState);
        });

        const emojiResults = resultLines.join('\n');
    
        const resultText = `Chordzzle ${attempts}/6\n\n${emojiResults}`;
    
        // Copy to clipboard
        navigator.clipboard.writeText(resultText).then(() => {
            alert("Results copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy results: ", err);
        });
    };

    const rulesModal = <Modal
            isOpen={viewRules}
            onRequestClose={closeRules}
            contentLabel="First Visit Popup"
            id='modal'
            className='modal-overlay'
        >
            <div className="rules-content">
                <button className="close-btn" onClick={closeRules}>&times;</button>

                <h2>How To Play</h2>
                <p>Guess the Chordzzle in 6 tries.</p>
                <ul>
                <li>Voicing matters! The notes appear from lowest to highest.</li>
                <li>The color of the notes will change to show how close your guess was to the correct chord.</li>
                </ul>

                <h3>Examples</h3>
                <div className="examples">
                <div className="example">
                    <div class="example-tile green">C</div>
                    <p>C is in the chord and in the correct spot.</p>
                </div>
                <div className="example">
                    <div class="example-tile yellow">G</div>
                    <p>G is in the chord but in the wrong spot.</p>
                </div>
                <div className="example">
                    <div class="example-tile grey">E</div>
                    <p>E is not in the chord in any spot.</p>
                </div>
                </div>

                <hr />
                
                <p>A new puzzle is released daily at midnight.</p>
            </div>
        </Modal>
    
    const statsModal = <Modal
            isOpen={viewStats}
            onRequestClose={closeStats}
            contentLabel="Stats Popup"
            id='modal'
            className='modal-overlay'
        >
            <div className="stats-content">
                <button className="close-btn" onClick={closeStats}>&times;</button>

                <h2>Your Stats</h2>
                {gameOver && ( // Only display the chord name when the game is over
                    <div className="game-over">
                        <h3>Today's Chord: {dailyChord?.chord_name}</h3>
                    </div>
                )}
                <div className="stats-header">
                    <div>
                        <span>{stats.gamesPlayed}</span>
                        <p>Played</p>
                    </div>
                    <div>
                        <span>{stats.winPercentage}</span>
                        <p>Win %</p>
                    </div>
                    <div>
                        <span>{stats.currentStreak}</span>
                        <p>Current Streak</p>
                    </div>
                    <div>
                        <span>{stats.maxStreak}</span>
                        <p>Max Streak</p>
                    </div>
                </div>

                <div className="stats-histogram">
                    {stats.attemptDist?.map((count, index) => (
                        <div key={index} className="histogram-bar">
                            <span>{index + 1}</span>
                            <div className="bar">
                                <div
                                    className="inner-bar"
                                    style={{
                                        width: `${calculateBarWidth(count, Math.max(...stats.attemptDist))}%`
                                    }}
                                ></div>
                            </div>
                            <span>{count}</span>
                        </div>
                    ))}
                </div>

                <div className="share-button-container">
                    <button className="share-button" onClick={shareResults}>
                        <span>Share</span>
                        <img src="/assets/share_512.png" alt="share-icon" />
                    </button>
                </div>

                <hr />
                <h3>New chordzzle in:</h3>
                <p>{timeRemaning}</p>

            </div>
        </Modal>

    return (
        <div className="App">
            <nav>
                <div className='info-container' onClick={openRules}>
                    <img src='/assets/info_512.png'></img>
                </div>
                <h1>Chordzzle</h1>
                <div className='stats-container' onClick={openStats}>
                    <img src='/assets/stats_512.png'></img>
                </div>
            </nav>

            {rulesModal}
            {statsModal}

            <AppContext.Provider 
                value={{ 
                    board, 
                    setBoard, 
                    currAttempt, 
                    setCurrAttempt, 
                    addKey, 
                    keys, 
                    selectedKeys, 
                    setSelectedKeys,
                    correctChord,
                    stats,
                    setStats,
                    viewStats,
                    setViewStats,
                    isWin,
                    setIsWin,
                    endGame,
                    setGameOver
                }}>
                <div className='game'>
                    <Board />
                    <Controls />
                    <Piano />
                </div>
            </AppContext.Provider>
        </div>
    );
}

export default App;
