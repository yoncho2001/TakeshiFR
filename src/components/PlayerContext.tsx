import React, { createContext} from 'react';

const PlayerContext = createContext<{
  currentPlayer: string;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<string>>|undefined;
}>({
  currentPlayer: '',
  setCurrentPlayer: undefined,
});

/*export function usePlayerContext() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayerContext must be used within a PlayerContext.Provider');
  }
  return context;
}
*/
export default PlayerContext;