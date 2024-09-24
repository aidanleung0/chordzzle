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
    const [viewPopup, setViewPopup] = useState(false);

    const keys = ["C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
        "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
    "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5", "C6"];

    const correctChord = ["C4", "A#4", "D5", "E5", "A5"];

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
            newBoard[currAttempt.attempt][index] = selectedKey;
        });

        setBoard(newBoard);
        setCurrAttempt({ ...currAttempt, notePos: updatedKeys.length });
    };

    const initializeStats = () => {
        const storedStats = localStorage.getItem('chordzzleStats');

        if (!storedStats) {
            const initialStats =  {
                gamesPlayed: 0,
                wins: 0,
                losses: 0,
                currentStreak: 0,
                bestStreak: 0,
            }
            localStorage.setItem('chordzzleStats', JSON.stringify(initialStats));
        }
    };

    const checkFirstVisit = () => {
        const visited = localStorage.getItem('alreadyVisited');

        if (!visited) {
            setViewPopup(true);
            localStorage.setItem('alreadyVisited', true);
        }
    };

    useEffect(() => {
        initializeStats();
        checkFirstVisit();
    }, []);

    const closePopup = () => {
        setViewPopup(false);
    };

    const openPopup = () => {
        setViewPopup(true);
      };

    return (
        <div className="App">
            <nav>
                <div className='info-container' onClick={openPopup}>
                    <img src='/assets/info_512.png'></img>
                </div>
                <h1>Chordzzle</h1>
                <div className='stats-container' onClick={openPopup}>
                    <img src='/assets/stats_512.png'></img>
                </div>
            </nav>

            <Modal
                isOpen={viewPopup}
                onRequestClose={closePopup}
                contentLabel="First Visit Popup"
                id='modal'
                className='modal-overlay'
            >
                <div className="modal-content">
                    <button className="close-btn" onClick={closePopup}>&times;</button>

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
                    correctChord
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
