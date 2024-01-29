import { useState } from 'react';
import './createScreen.less';
import Button from '../components/button.tsx';
import InsertName from './insertName.tsx';
import RenderTypes from './renderTypes.tsx';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";

export default function CreateScreen() {
  const [playerName, setPlayerName] = useState('');

  return (
    <>
      <InsertName onChange={setPlayerName} />
      <Stack className="players" direction="row" spacing={2}>
        <RenderTypes playerName={playerName} />
      </Stack>
      <Link to='/' >
        <Button variant='outlined' className='emptyButton' content={"Go back"}/>
      </Link>
    </>
  );
}
