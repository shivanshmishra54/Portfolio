import React, { createContext, useContext } from 'react';
import { use3DQuality } from './hooks/use3DQuality';

const QualityContext = createContext('HIGH');

export function QualityManager({ children }) {
  const quality = use3DQuality();

  return (
    <QualityContext.Provider value={quality}>
      {children}
    </QualityContext.Provider>
  );
}

export function useQuality() {
  return useContext(QualityContext);
}
