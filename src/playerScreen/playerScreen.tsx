import { useEffect, useState } from 'react';
import './playerScreen.less';
import Button from '../components/button.tsx';
import InsertName from './insertName.tsx';
import RenderTypes from './renderTypes.tsx';
import Stack from '@mui/material/Stack';

export default function PlayerScreen() {
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    console.log('zdr');
  }, [playerName])

  return (
    <>
      <h1>Yoncho Takeshi</h1>
      <h2>{playerName}</h2>
      <InsertName onChange={setPlayerName}/>
      <Stack className="players" direction="row" spacing={2}>
        <RenderTypes/>
      </Stack>
      <Button variant='outlined' className='emptyButton' herf = {'/'} content={'go back'}/>
    </>
  );
}
