import React from 'react';
import ReactDOM from 'react-dom/client';
import StartScreen from './startScreen/screen.tsx';
import './index.less';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StartScreen />
  </React.StrictMode>,
);