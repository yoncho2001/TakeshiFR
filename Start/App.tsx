import React from 'react';
import './App.less';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export function ButtonUsage() {
  return <Button variant="contained">Hello World</Button>;
}

export default function Title() {
  return (
    <>
      <h1>Yoncho Takeshi</h1>
      <Stack direction="column" spacing={2}>
      <Button className="playerButton" variant="outlined" startIcon={<img src="public/PictureMelee.svg" alt="icon" />}>
        <div>Name</div>
        <div>lv</div>
      </Button>
      <Button className="playerButton" variant="outlined" startIcon={<img src="public/PictureMelee.svg" alt="icon" />}>
        <div>Name</div>
        <div>lv</div>
      </Button>
      <Button className="playerButton" variant="outlined" startIcon={<img src="public/PictureMelee.svg" alt="icon" />}>
        <div>Name</div>
        <div>lv</div>
      </Button>
      </Stack>
    </>
  );
}