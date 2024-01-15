import React from 'react';
import ReactDOM from 'react-dom/client';
import Title, { ButtonUsage } from './App.tsx';
import './index.less';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Title />
  </React.StrictMode>,
);