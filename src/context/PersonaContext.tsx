"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Persona = 'ai-ml' | 'full-stack' | 'sde';

interface PersonaContextType {
  persona: Persona;
  setPersona: (persona: Persona) => void;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export const PersonaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [persona, setPersonaState] = useState<Persona>('ai-ml');

  useEffect(() => {
    // Read initial value from localStorage if available
    const saved = localStorage.getItem('uppara_vinod_portfolio_persona');
    if (saved === 'ai-ml' || saved === 'full-stack' || saved === 'sde') {
      setPersonaState(saved);
    }
  }, []);

  const setPersona = (newPersona: Persona) => {
    setPersonaState(newPersona);
    localStorage.setItem('uppara_vinod_portfolio_persona', newPersona);
  };

  return (
    <PersonaContext.Provider value={{ persona, setPersona }}>
      {children}
    </PersonaContext.Provider>
  );
};

export const usePersona = () => {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
};
