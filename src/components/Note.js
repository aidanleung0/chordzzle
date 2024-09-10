import React, {useContext} from 'react';
import {AppContext} from '../App'

function Note({notePos, attemptVal}) {
    const { board } = useContext(AppContext);
    const note = board[attemptVal][notePos];
  return (
    <div className='note'>{note}</div>
  )
}

export default Note