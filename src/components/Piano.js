import React, { useContext } from 'react';
import Key from './Key';
import { AppContext } from '../App';

function Piano() {
    
    const { keys } = useContext(AppContext);

    const audioFiles = keys.map((note, index) => {
        const fileName = note.replace('#', 'sharp');
        return (
            <audio
                id={fileName}
                key={index}
                src={`/cropped_audio/${fileName}.mp3`}
            >
            </audio>);
    });
        
    return (
        <div className='piano'>
            {keys.map((key) => {
                return <div> <Key keyVal={key} /> </div>;
            })}
            <div>
                {audioFiles}
            </div>
        </div>
    )
}

export default Piano