import TRAITEMENT_ABANDONNER_MISE_A_JOUR from "@api/traitements/TraitementAbandonnerMiseAJour";
import { createContext, useEffect, useMemo, useState } from "react";
import PageChargeur from "../composants/commun/chargeurs/PageChargeur";
import { useCreateBlocker } from "../hooks/CreateBlocker";
import useTraitementApi from "../hooks/api/TraitementApiHook";

export enum ECleOngletsMiseAJour {
  ACTE = "acte",
  ACTE_MIS_A_JOUR = "acte-mis-a-jour",
  ANALYSE_MARGINALE = "analyse-marginale"
}

interface IEditionMiseAJourContext {
  idActe: string;
  idRequete: string;
  ongletsActifs: {
    actes: string;
    formulaires: string;
  };
  miseAJourEffectuee: boolean;
  composerActeMisAJour: boolean;
}

interface IEditionMiseAJourContextActions {
  changerOnglet: (actes: ECleOngletsMiseAJour | null, formulaires: ECleOngletsMiseAJour | null) => void;
  activerOngletActeMisAJour: () => void;
  setComposerActeMisAJour: React.Dispatch<React.SetStateAction<boolean>>;
  desactiverBlocker: () => void;
}

export const EditionMiseAJourContext = {
  Valeurs: createContext<IEditionMiseAJourContext>({} as IEditionMiseAJourContext),
  Actions: createContext<IEditionMiseAJourContextActions>({} as IEditionMiseAJourContextActions)
};

interface IEditionMiseAJourContextProviderProps {
  idActe: string;
  idRequete: string;
}

const EditionMiseAJourContextProvider: React.FC<React.PropsWithChildren<IEditionMiseAJourContextProviderProps>> = ({
  idActe,
  idRequete,
  children
}) => {
  const [ongletsActifs, setOngletsActifs] = useState({
    actes: ECleOngletsMiseAJour.ACTE,
    formulaires: ECleOngletsMiseAJour.ANALYSE_MARGINALE
  });
  const [miseAJourEffectuee, setMiseAJourEffectuee] = useState<boolean>(false);
  const [composerActeMisAJour, setComposerActeMisAJour] = useState<boolean>(false);

  const { lancerTraitement: lancerTraitementAbandonner, traitementEnCours: abandonEnCours } =
    useTraitementApi(TRAITEMENT_ABANDONNER_MISE_A_JOUR);

  const { gestionBlocker, BlockerNavigation } = useCreateBlocker({
    titre: "Abandon du traitement",
    messages: ["La saisie en cours sera perdue.", "Voulez-vous continuer ?"],
    executerApresConfirmation: () =>
      lancerTraitementAbandonner({ parametres: { idActe: idActe, idRequete: idRequete, miseAJourEffectuee: miseAJourEffectuee } }),
    executerSiRedirectionAvecBlocageSansPopin: () =>
      lancerTraitementAbandonner({ parametres: { idActe: idActe, idRequete: idRequete, miseAJourEffectuee: miseAJourEffectuee } })
  });

  const valeursContext = useMemo<IEditionMiseAJourContext>(
    () => ({
      idActe: idActe,
      idRequete: idRequete,
      ongletsActifs: ongletsActifs,
      miseAJourEffectuee: miseAJourEffectuee,
      composerActeMisAJour: composerActeMisAJour
    }),
    [idActe, idRequete, ongletsActifs, miseAJourEffectuee, composerActeMisAJour]
  );

  const actionsContext = useMemo<IEditionMiseAJourContextActions>(
    () => ({
      changerOnglet: (actes: ECleOngletsMiseAJour | null, formulaires: ECleOngletsMiseAJour | null) => {
        setOngletsActifs(prec => ({
          ...prec,
          ...(actes ? { actes: actes } : {}),
          ...(formulaires ? { formulaires: formulaires } : {})
        }));
      },
      activerOngletActeMisAJour: () => {
        setMiseAJourEffectuee(true);
        gestionBlocker.activerBlockerAvecConfirmation();
      },
      setComposerActeMisAJour: setComposerActeMisAJour,
      desactiverBlocker: gestionBlocker.desactiverBlocker
    }),
    []
  );

  useEffect(() => gestionBlocker.activerBlockerSansConfirmation(), []);

  return (
    <EditionMiseAJourContext.Valeurs.Provider value={valeursContext}>
      <EditionMiseAJourContext.Actions.Provider value={actionsContext}>
        {abandonEnCours && <PageChargeur />}
        {children}
        <BlockerNavigation />
      </EditionMiseAJourContext.Actions.Provider>
    </EditionMiseAJourContext.Valeurs.Provider>
  );
};

export default EditionMiseAJourContextProvider;
