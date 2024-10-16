import { CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR } from "@api/configurations/requete/miseAJour/PatchStatutRequeteMiseAjour";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import messageManager from "@util/messageManager";
import { createContext, useEffect, useMemo, useState } from "react";
import PageChargeur from "../composants/commun/chargeurs/PageChargeur";
import { useCreateBlocker } from "../hooks/CreateBlocker";
import useFetchApi from "../hooks/api/FetchApiHook";

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
  changerOnglet: (
    actes: ECleOngletsMiseAJour | null,
    formulaires: ECleOngletsMiseAJour | null
  ) => void;
  activerOngletActeMisAJour: () => void;
  setComposerActeMisAJour: React.Dispatch<React.SetStateAction<boolean>>;
  desactiverBlocker: () => void;
}

export const EditionMiseAJourContext = {
  Valeurs: createContext<IEditionMiseAJourContext>(
    {} as IEditionMiseAJourContext
  ),
  Actions: createContext<IEditionMiseAJourContextActions>(
    {} as IEditionMiseAJourContextActions
  )
};

interface IEditionMiseAJourContextProviderProps {
  idActe: string;
  idRequete: string;
}

const EditionMiseAJourContextProvider: React.FC<
  React.PropsWithChildren<IEditionMiseAJourContextProviderProps>
> = ({ idActe, idRequete, children }) => {
  const [ongletsActifs, setOngletsActifs] = useState({
    actes: ECleOngletsMiseAJour.ACTE,
    formulaires: ECleOngletsMiseAJour.ANALYSE_MARGINALE
  });
  const [miseAJourEffectuee, setMiseAJourEffectuee] = useState<boolean>(false);
  const [composerActeMisAJour, setComposerActeMisAJour] =
    useState<boolean>(false);

  const {
    appelApi: appelApiModifierStatutRequeteMiseAJour,
    enAttenteDeReponseApi: enAttenteClotureRequete
  } = useFetchApi(CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR);

  const abandonnerRequete = () => {
    appelApiModifierStatutRequeteMiseAJour({
      parametres: {
        path: {
          idRequete: idRequete,
          statut: StatutRequete.getKey(StatutRequete.ABANDONNEE)
        },
        query: { estMiseAjourAnalyseMarginale: true }
      },
      apresErreur: () => {
        messageManager.showError(
          "Impossible de clôturer la requête de mise à jour."
        );
      }
    });
  };

  const { gestionBlocker, BlockerNavigation } = useCreateBlocker({
    messages: ["La saisie en cours sera perdue.", "Voulez-vous continuer ?"],
    executerApresConfirmation: () => {
      abandonnerRequete();
    },
    titre: "Abandon du traitement",
    executerSiRedirectionAvecBlocageSansPopin: () => {
      abandonnerRequete();
    }
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
      changerOnglet: (
        actes: ECleOngletsMiseAJour | null,
        formulaires: ECleOngletsMiseAJour | null
      ) => {
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
        {enAttenteClotureRequete && <PageChargeur />}
        {children}
        <BlockerNavigation />
      </EditionMiseAJourContext.Actions.Provider>
    </EditionMiseAJourContext.Valeurs.Provider>
  );
};

export default EditionMiseAJourContextProvider;
