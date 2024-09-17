import './App.css';
import Board from './components/Board';
import Controls from './components/Controls';
import Piano from './components/Piano';
import { createContext, useState } from 'react';
import { boardDefault } from './Chords';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, notePos: 0 });
  const [selectedKeys, setSelectedKeys] = useState([]);

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
      }
      
      if (selectedKeys.length === 5) return;
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

  return (
      <div className="App">
          <nav>
              <h1>Chordzzle</h1>
          </nav>
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
