import React, { useContext } from 'react';
import Key from './Key';
import { AppContext } from '../App';

function Piano() {
    
    const { keys } = useContext(AppContext);
    
    return (
        <div className='piano'>
            {keys.map((key) => {
                return <div> <Key keyVal={key} /> </div>;
            })}
        </div>
        
    )
}

export default Piano