import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { appartientAMonServiceOuServicesMeresOuServicesFilles } from "../../../../model/agent/IOfficier";
import { IUuidRequeteParams } from "../../../../model/params/IUuidRequeteParams";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { Requete, TRequete } from "../../../../model/requete/IRequete";
import { IRequeteInformation } from "../../../../model/requete/IRequeteInformation";
import { IRequeteTableauInformation } from "../../../../model/requete/IRequeteTableauInformation";
import { BandeauRequete } from "../../../common/composant/bandeauApercuRequete/BandeauApercuRequete";
import { SuiviActionsRequete } from "../../../common/composant/suivis/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../../../common/composant/suivis/SuiviObservationRequete";
import {
  CreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "../../../common/hook/requete/CreationActionMiseAjourStatutHook";
import { ProtectionApercu } from "../../../common/util/route/Protection/ProtectionApercu";
import { getLibelle } from "../../../common/util/Utils";
import { RMCAuto } from "../../rechercheMultiCriteres/autoActesInscriptions/RMCAuto";
import { RMCRequetesAssocieesResultats } from "../../rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import {
  IDetailRequeteParams,
  useAvecRejeuDetailRequeteApiHook
} from "../../requeteDelivrance/detailRequete/hook/DetailRequeteHook";
import { ReponseReqInfo } from "./contenu/ReponseReqInfo";
import { ResumeReqInfo } from "./contenu/ResumeReqInfo";
import "./scss/ApercuReqInfoPage.scss";

interface ApercuReqInfoPageProps {
  idRequeteAAfficher?: string;
}

export const ApercuReqInfoPage: React.FC<ApercuReqInfoPageProps> = props => {
  const [detailRequeteParams, setDetailRequeteParams] =
    useState<IDetailRequeteParams>();
  const [requete, setRequete] = useState<IRequeteInformation>();
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const [affichageBoutonPrendreEnCharge, setAffichageBoutonPrendreEnCharge] =
    useState(false);

  const [paramsMAJReqInfo, setParamsMAJReqInfo] =
    useState<CreationActionMiseAjourStatutHookParams>();

  useCreationActionMiseAjourStatut(paramsMAJReqInfo);

  const { detailRequeteState } =
    useAvecRejeuDetailRequeteApiHook(detailRequeteParams);

  useEffect(() => {
    // L'idRequete peut venir de l'URL ou bien être une props dans le cas d'une requete liée
    if (props.idRequeteAAfficher) {
      setDetailRequeteParams({ idRequete: props.idRequeteAAfficher });
    } else {
      setDetailRequeteParams({ idRequete: idRequeteParam });
    }
  }, [idRequeteParam, props.idRequeteAAfficher]);

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteInformation);
      if (props.idRequeteAAfficher === undefined) {
        // Si l'id de la requête n'est pas fourni par les props (on n'est pas dans une fenêtre externe)
        setAffichageBoutonPrendreEnCharge(
          priseEnChargePossible(detailRequeteState)
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailRequeteState]);

  const onclickPrendreEnCharge = useCallback(() => {
    if (
      detailRequeteParams &&
      Requete.estDeTypeInformation(detailRequeteState)
    ) {
      setParamsMAJReqInfo({
        libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        requete: {
          idRequete: detailRequeteState?.id,
          statut: detailRequeteState?.statutCourant.statut
        } as IRequeteTableauInformation,
        callback: () => {
          setDetailRequeteParams({ idRequete: detailRequeteParams.idRequete });
        }
      });
    }
  }, [detailRequeteParams, detailRequeteState]);

  return (
    <div className="ApercuRequete">
      <title>{getLibelle("Aperçu requête d'information")}</title>
      {requete && (
        <ProtectionApercu
          statut={requete.statutCourant.statut}
          type={requete.type}
          forcePass={props.idRequeteAAfficher !== undefined}
        >
          <BandeauRequete requete={requete} />
          <div className="contenuRequeteInfo">
            <div className="side left">
              <ResumeReqInfo requete={requete} />
              <SuiviObservationsRequete
                observations={requete.observations}
                idRequete={requete.id}
              ></SuiviObservationsRequete>
              {!affichageBoutonPrendreEnCharge && (
                <RMCRequetesAssocieesResultats requete={requete} />
              )}
              <SuiviActionsRequete
                actions={requete.actions}
              ></SuiviActionsRequete>
            </div>
            <div className="side right">
              {!affichageBoutonPrendreEnCharge && (
                <RMCAuto requete={detailRequeteState} />
              )}
              <ReponseReqInfo
                requete={requete}
                disabled={props.idRequeteAAfficher !== undefined}
                affichageBoutonPrendreEnCharge={affichageBoutonPrendreEnCharge}
                onclickPrendreEnCharge={onclickPrendreEnCharge}
              />
            </div>
          </div>
        </ProtectionApercu>
      )}
    </div>
  );
};

function priseEnChargePossible(requete: TRequete) {
  let estPriseEnChargePossible = false;
  const estDansMaStructureDeService =
    appartientAMonServiceOuServicesMeresOuServicesFilles(requete.idEntite);

  if (
    Requete.estDeTypeInformation(requete) &&
    Requete.estATraiterOuEstATransferer(requete) &&
    estDansMaStructureDeService &&
    Requete.nAppartientAPersonne(requete)
  ) {
    estPriseEnChargePossible = true;
  }

  return estPriseEnChargePossible;
}
