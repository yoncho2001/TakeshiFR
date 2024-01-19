import React from 'react';
import Button from '../components/button.tsx';
import Players from '../startScreen/renderPlayers.tsx';
import Stack from '@mui/material/Stack';

export default function PlayerScreen() {
  return (
    <>
      <h1>Yoncho Takeshi vtora sranica</h1>
      <Stack className="players" direction="column" spacing={2}>
        < Players />
        <Button  variant='outlined' className='emptyButton' herf = {'/'} content={'go back'}/>
      </Stack>
    </>
  );
}
