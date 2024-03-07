import React, { createContext } from 'react';

const PlayerContext = createContext<{
  currentPlayer: string;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<string>> | undefined;
}>({
  currentPlayer: '',
  setCurrentPlayer: undefined,
});

export default PlayerContext;