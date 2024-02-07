import './startScreen.less';
import Players from './renderPlayers';
import Stack from '@mui/material/Stack';

export default function StartScreen() {
  return (
    <>
      <Stack className="players" direction="column" spacing={2}>
        < Players />
        
      </Stack>
    </>
  );
}