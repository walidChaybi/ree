import TRAITEMENT_CHARGER_REQUETE_TRANSCRIPTION_ET_PROJET_ACTE_TRANSCRIT from "@api/traitements/projetActe/transcription/TraitementChargerRequeteTranscriptionEtProjetActeTranscrit";
import { ProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/ProjetActeTranscrit";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import messageManager from "@util/messageManager";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import PageChargeur from "../composants/commun/chargeurs/PageChargeur";
import useTraitementApi from "../hooks/api/TraitementApiHook";

interface IRequeteEtProjetActe {
  requete: IRequeteCreationTranscription | null;
  projetActe: ProjetActeTranscrit | null;
}

interface ISaisieProjetActeTranscritContext {
  requete: IRequeteCreationTranscription;
  projetActe: ProjetActeTranscrit | null;
  rechargerRequeteEtProjetActe: (onRechargementTermine?: () => void) => void;
}

export const SaisieProjetActeTranscritContext = React.createContext<ISaisieProjetActeTranscritContext>(
  {} as ISaisieProjetActeTranscritContext
);

const SaisieProjetActeTranscritContextProvider: React.FC<
  React.PropsWithChildren<{
    idRequete: string;
    estModeConsultation: boolean;
  }>
> = ({ idRequete, estModeConsultation, children }) => {
  const [requeteEtProjetActe, setRequeteEtProjetActe] = useState<IRequeteEtProjetActe | null>(null);
  const { lancerTraitement: lancerChargementRequeteEtProjetActe, traitementEnCours: chargementRequeteEtProjetActeEnCours } =
    useTraitementApi(TRAITEMENT_CHARGER_REQUETE_TRANSCRIPTION_ET_PROJET_ACTE_TRANSCRIT);

  const navigate = useNavigate();

  useEffect(() => {
    if (!idRequete) return;

    lancerChargementRequeteEtProjetActe({
      parametres: { idRequete, estModeConsultation },
      apresSucces: setRequeteEtProjetActe,
      apresErreur: messageErreur => {
        messageErreur && messageManager.showError(messageErreur);
        navigate(-1);
      }
    });
  }, [idRequete]);

  const valeursContexte: ISaisieProjetActeTranscritContext = useMemo(() => {
    if (!requeteEtProjetActe?.requete) return {} as ISaisieProjetActeTranscritContext;

    return {
      requete: requeteEtProjetActe.requete,
      projetActe: requeteEtProjetActe.projetActe || null,
      rechargerRequeteEtProjetActe: (onRechargementTermine?: () => void) => {
        lancerChargementRequeteEtProjetActe({
          parametres: { idRequete, estModeConsultation },
          apresSucces: setRequeteEtProjetActe,
          apresErreur: messageErreur => {
            messageErreur && messageManager.showError(messageErreur);
          },
          finalement: onRechargementTermine
        });
      }
    };
  }, [requeteEtProjetActe]);

  return (
    <SaisieProjetActeTranscritContext.Provider value={valeursContexte}>
      {chargementRequeteEtProjetActeEnCours && <PageChargeur />}
      {requeteEtProjetActe && children}
    </SaisieProjetActeTranscritContext.Provider>
  );
};

export default SaisieProjetActeTranscritContextProvider;
