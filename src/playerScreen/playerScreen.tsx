import './playerScreen.less';
import CurrentPlayer from './renderPlayer';
import Stack from '@mui/material/Stack';

export default function PlayerScreen() {
  return (
    <>
      <h1>Yoncho Takeshi</h1>
        < CurrentPlayer />
    </>
  );
}