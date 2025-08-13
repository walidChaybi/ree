import React, { createContext, useState } from "react";

export enum EBlocsRMC {
  TITULAIRE = "TITULAIRE",
  EVENEMENT = "EVENEMENT",
  RCRCAPACS = "RCRCAPACS",
  ACTE = "ACTE"
}
export interface IRMCContextProps {
  blocsRenseignes: (keyof typeof EBlocsRMC)[];
  setBlocsRenseignes?: React.Dispatch<React.SetStateAction<(keyof typeof EBlocsRMC)[]>>;
}

export const RMCContext = createContext<IRMCContextProps>({ blocsRenseignes: [] });

const RMCContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [blocsRenseignes, setBlocsRenseignes] = useState<(keyof typeof EBlocsRMC)[]>([]);

  return <RMCContext.Provider value={{ blocsRenseignes, setBlocsRenseignes }}>{children}</RMCContext.Provider>;
};

export { RMCContextProvider };
