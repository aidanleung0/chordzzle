import './App.css';
import Board from './components/Board';
import Piano from './components/Piano';
import { createContext, useState } from 'react';
import { boardDefault } from './Chords';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  return (
    <div className="App">
      <nav>
        <h1>Chordzzle</h1>
      </nav>
      <AppContext.Provider value={{ board, setBoard }}>
        <div className='game'>
          <Board />
          <Piano />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
