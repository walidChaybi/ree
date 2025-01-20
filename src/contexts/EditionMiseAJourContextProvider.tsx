import TRAITEMENT_ABANDONNER_MISE_A_JOUR from "@api/traitements/TraitementAbandonnerMiseAJour";
import React, { createContext, useEffect, useMemo, useState } from "react";
import PageChargeur from "../composants/commun/chargeurs/PageChargeur";
import { useCreateBlocker } from "../hooks/CreateBlocker";
import useTraitementApi from "../hooks/api/TraitementApiHook";

export enum ECleOngletsMiseAJour {
  ACTE = "acte",
  ACTE_MIS_A_JOUR = "acte-mis-a-jour",
  ANALYSE_MARGINALE = "analyse-marginale",
  MENTIONS = "mentions"
}

interface IEditionMiseAJourContext {
  idActe: string;
  idRequete: string;
  ongletsActifs: {
    actes: ECleOngletsMiseAJour;
    formulaires: ECleOngletsMiseAJour;
  };
  miseAJourEffectuee: boolean;
  composerActeMisAJour: boolean;
  estMiseAJourAvecMentions: boolean;
  estActeSigne: boolean;
}

interface IEditionMiseAJourContextActions {
  changerOnglet: (actes: ECleOngletsMiseAJour | null, formulaires: ECleOngletsMiseAJour | null) => void;
  activerOngletActeMisAJour: () => void;
  setComposerActeMisAJour: React.Dispatch<React.SetStateAction<boolean>>;
  desactiverBlocker: () => void;
  setEstActeSigne: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditionMiseAJourContext = {
  Valeurs: createContext<IEditionMiseAJourContext>({} as IEditionMiseAJourContext),
  Actions: createContext<IEditionMiseAJourContextActions>({} as IEditionMiseAJourContextActions)
};

interface IEditionMiseAJourContextProviderProps {
  idActe: string;
  idRequete: string;
  estMiseAJourAvecMentions: boolean;
}

const EditionMiseAJourContextProvider: React.FC<React.PropsWithChildren<IEditionMiseAJourContextProviderProps>> = ({
  idActe,
  idRequete,
  estMiseAJourAvecMentions,
  children
}) => {
  const [ongletsActifs, setOngletsActifs] = useState<{ actes: ECleOngletsMiseAJour; formulaires: ECleOngletsMiseAJour }>({
    actes: ECleOngletsMiseAJour.ACTE,
    formulaires: estMiseAJourAvecMentions ? ECleOngletsMiseAJour.MENTIONS : ECleOngletsMiseAJour.ANALYSE_MARGINALE
  });
  const [miseAJourEffectuee, setMiseAJourEffectuee] = useState<boolean>(false);
  const [composerActeMisAJour, setComposerActeMisAJour] = useState<boolean>(false);
  const [estActeSigne, setEstActeSigne] = useState<boolean>(false);

  const { lancerTraitement: lancerTraitementAbandonner, traitementEnCours: abandonEnCours } =
    useTraitementApi(TRAITEMENT_ABANDONNER_MISE_A_JOUR);

  const { gestionBlocker, BlockerNavigation } = useCreateBlocker({
    titre: "Abandon du traitement",
    messages: ["La saisie en cours sera perdue.", "Voulez-vous continuer ?"],
    executerApresConfirmation: debloquer =>
      lancerTraitementAbandonner({
        parametres: {
          idActe: idActe,
          idRequete: idRequete,
          miseAJourEffectuee: miseAJourEffectuee,
          estMiseAJourAvecMentions: estMiseAJourAvecMentions
        },
        finalement: debloquer
      }),
    executerSiRedirectionAvecBlocageSansPopin: debloquer =>
      lancerTraitementAbandonner({
        parametres: {
          idActe: idActe,
          idRequete: idRequete,
          miseAJourEffectuee: miseAJourEffectuee,
          estMiseAJourAvecMentions: estMiseAJourAvecMentions
        },
        finalement: debloquer
      })
  });

  const valeursContext = useMemo<IEditionMiseAJourContext>(
    () => ({
      idActe,
      idRequete,
      ongletsActifs,
      miseAJourEffectuee,
      composerActeMisAJour,
      estMiseAJourAvecMentions,
      estActeSigne
    }),
    [idActe, idRequete, ongletsActifs, miseAJourEffectuee, composerActeMisAJour, estMiseAJourAvecMentions, estActeSigne]
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
      setComposerActeMisAJour,
      desactiverBlocker: gestionBlocker.desactiverBlocker,
      setEstActeSigne
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
