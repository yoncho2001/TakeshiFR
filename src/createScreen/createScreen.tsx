import { useEffect, useState } from 'react';
import './createScreen.less';
import Button from '../components/button.tsx';
import InsertName from './insertName.tsx';
import RenderTypes from './renderTypes.tsx';
import Stack from '@mui/material/Stack';

export default function CreateScreen() {
  const [playerName, setPlayerName] = useState('');

  return (
    <>
      <h1>Yoncho Takeshi</h1>
      <InsertName onChange={setPlayerName} />
      <Stack className="players" direction="row" spacing={2}>
        <RenderTypes playerName={playerName} />
      </Stack>
      <Button variant='outlined' className='emptyButton' herf={'/'} content={'go back'} onClick={() => { }} />
    </>
  );
}
