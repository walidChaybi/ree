import TRAITEMENT_ABANDONNER_MISE_A_JOUR from "@api/traitements/TraitementAbandonnerMiseAJour";
import { IMajAnalyseMarginale } from "@hook/acte/EnregistrerMentionsApiHook";
import { IMajMention } from "@pages/requeteMiseAJour/apercuRequete/ApercuRequeteMiseAJourPage";
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
    actes: string;
    formulaires: string;
  };
  miseAJourEffectuee: boolean;
  composerActeMisAJour: boolean;
  estMiseAJourAvecMentions: boolean;
  listeMentions: IMajMention[];
  analyseMarginale: IMajAnalyseMarginale | null;
  estFormulaireAnalyseMarginaleModifie: boolean;
  estMentionEnCoursDeSaisie: boolean;
  listeMentionsEnregistrees: IMajMention[];
  estActeSigne: boolean;
  indexMentionModifiee?: number;
}

interface IEditionMiseAJourContextActions {
  changerOnglet: (actes: ECleOngletsMiseAJour | null, formulaires: ECleOngletsMiseAJour | null) => void;
  activerOngletActeMisAJour: () => void;
  setComposerActeMisAJour: React.Dispatch<React.SetStateAction<boolean>>;
  desactiverBlocker: () => void;
  setListeMentions: React.Dispatch<React.SetStateAction<IMajMention[]>>;
  setAnalyseMarginale: React.Dispatch<React.SetStateAction<IMajAnalyseMarginale | null>>;
  setEstFormulaireAnalyseMarginaleModifie: React.Dispatch<React.SetStateAction<boolean>>;
  setEstMentionEnCoursDeSaisie: React.Dispatch<React.SetStateAction<boolean>>;

  setListeMentionsEnregistrees: React.Dispatch<React.SetStateAction<IMajMention[]>>;
  setEstActeSigne: React.Dispatch<React.SetStateAction<boolean>>;
  setIndexMentionModifiee: React.Dispatch<React.SetStateAction<number | undefined>>;
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
  const [ongletsActifs, setOngletsActifs] = useState({
    actes: ECleOngletsMiseAJour.ACTE,
    formulaires: estMiseAJourAvecMentions ? ECleOngletsMiseAJour.MENTIONS : ECleOngletsMiseAJour.ANALYSE_MARGINALE
  });
  const [miseAJourEffectuee, setMiseAJourEffectuee] = useState<boolean>(false);
  const [composerActeMisAJour, setComposerActeMisAJour] = useState<boolean>(false);
  const [listeMentions, setListeMentions] = useState<IMajMention[]>([]);
  const [analyseMarginale, setAnalyseMarginale] = useState<IMajAnalyseMarginale | null>(null);
  const [estFormulaireAnalyseMarginaleModifie, setEstFormulaireAnalyseMarginaleModifie] = useState<boolean>(false);
  const [estMentionEnCoursDeSaisie, setEstMentionEnCoursDeSaisie] = useState<boolean>(false);
  const [listeMentionsEnregistrees, setListeMentionsEnregistrees] = useState<IMajMention[]>([]);
  const [estActeSigne, setEstActeSigne] = useState<boolean>(false);
  const [indexMentionModifiee, setIndexMentionModifiee] = useState<number>();

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
      listeMentions,
      analyseMarginale,
      estFormulaireAnalyseMarginaleModifie,
      estMentionEnCoursDeSaisie,
      listeMentionsEnregistrees,
      estActeSigne,
      indexMentionModifiee
    }),
    [
      idActe,
      idRequete,
      ongletsActifs,
      miseAJourEffectuee,
      composerActeMisAJour,
      estMiseAJourAvecMentions,
      listeMentions,
      analyseMarginale,
      estFormulaireAnalyseMarginaleModifie,
      estMentionEnCoursDeSaisie,
      listeMentionsEnregistrees,
      estActeSigne,
      indexMentionModifiee
    ]
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
      setListeMentions,
      setAnalyseMarginale,
      setEstFormulaireAnalyseMarginaleModifie,
      setEstMentionEnCoursDeSaisie,
      setListeMentionsEnregistrees,
      setEstActeSigne,
      setIndexMentionModifiee
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
