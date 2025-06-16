import { ProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/transcription/ProjetActeTranscrit";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useMemo } from "react";
import { SaisieProjetActeTranscritContext } from "../../../contexts/SaisieProjetActeTranscritContextProvider";

interface IMockSaisieProjetContextProviderProps {
  requete: IRequeteCreationTranscription;
  projetActe: ProjetActeTranscrit | null;
  mettreAJourDonneesContext: (projetActe: ProjetActeTranscrit | null, statutRequete: StatutRequete | null) => void;
}

const MockSaisieProjetActeContextProvider: React.FC<React.PropsWithChildren<IMockSaisieProjetContextProviderProps>> = ({
  requete,
  projetActe,
  mettreAJourDonneesContext,
  children
}) => {
  const valeursContexte = useMemo(
    () => ({
      requete,
      projetActe,
      mettreAJourDonneesContext
    }),
    [requete, projetActe, mettreAJourDonneesContext]
  );

  return <SaisieProjetActeTranscritContext.Provider value={valeursContexte}>{children}</SaisieProjetActeTranscritContext.Provider>;
};

export default MockSaisieProjetActeContextProvider;
