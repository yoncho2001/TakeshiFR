import Button from '../components/button.tsx';
import RenderTypes from './renderTypes.tsx';
import Stack from '@mui/material/Stack';

export default function PlayerScreen() {
  return (
    <>
      <h1>Yoncho Takeshi</h1>
      <h2>Enter Name</h2>
      <Stack className="players" direction="row" spacing={2}>
        < RenderTypes />
      </Stack>
      <Button  variant='outlined' className='emptyButton' herf = {'/'} content={'go back'}/>
    </>
  );
}
