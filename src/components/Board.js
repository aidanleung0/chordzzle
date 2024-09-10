import React, { useState } from 'react';
import Note from './Note';

function Board() {
    return (
        <div className='board'>
            <div className='row'>
                <Note notePos={0} attemptVal={0}/>
                <Note notePos={1} attemptVal={0}/>
                <Note notePos={2} attemptVal={0}/>
                <Note notePos={3} attemptVal={0}/>
                <Note notePos={4} attemptVal={0}/>
            </div>
            <div className='row'>
                <Note notePos={0} attemptVal={1}/>
                <Note notePos={1} attemptVal={1}/>
                <Note notePos={2} attemptVal={1}/>
                <Note notePos={3} attemptVal={1}/>
                <Note notePos={4} attemptVal={1}/>
            </div>
            <div className='row'>
                <Note notePos={0} attemptVal={2}/>
                <Note notePos={1} attemptVal={2}/>
                <Note notePos={2} attemptVal={2}/>
                <Note notePos={3} attemptVal={2}/>
                <Note notePos={4} attemptVal={2}/>
            </div>
            <div className='row'>
                <Note notePos={0} attemptVal={3}/>
                <Note notePos={1} attemptVal={3}/>
                <Note notePos={2} attemptVal={3}/>
                <Note notePos={3} attemptVal={3}/>
                <Note notePos={4} attemptVal={3}/>
            </div>
            <div className='row'>
                <Note notePos={0} attemptVal={4}/>
                <Note notePos={1} attemptVal={4}/>
                <Note notePos={2} attemptVal={4}/>
                <Note notePos={3} attemptVal={4}/>
                <Note notePos={4} attemptVal={4}/>
            </div>
            <div className='row'>
                <Note notePos={0} attemptVal={5}/>
                <Note notePos={1} attemptVal={5}/>
                <Note notePos={2} attemptVal={5}/>
                <Note notePos={3} attemptVal={5}/>
                <Note notePos={4} attemptVal={5}/>
            </div>
        </div>
    )
}

export default Board