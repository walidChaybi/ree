import { BandeauRequete } from "@composant/bandeauApercuRequete/BandeauApercuRequete";
import { SuiviActionsRequete } from "@composant/suivis/SuiviActionsRequete";
import { SuiviObservationsRequete } from "@composant/suivis/SuiviObservationsRequete";
import { useTitreDeLaFenetre } from "@core/document/TitreDeLaFenetreHook";
import {
  ICreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "@hook/requete/CreationActionMiseAjourStatutHook";
import { appartientAMonServiceOuServicesParentsOuServicesFils } from "@model/agent/IOfficier";
import { TUuidRequeteParams } from "@model/params/TUuidRequeteParams";
import { Requete, TRequete } from "@model/requete/IRequete";
import { IRequeteInformation } from "@model/requete/IRequeteInformation";
import { IRequeteTableauInformation } from "@model/requete/IRequeteTableauInformation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { ProtectionApercu } from "@util/route/Protection/ProtectionApercu";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  IDetailRequeteParams,
  useAvecRejeuDetailRequeteApiHook
} from "../../../common/hook/requete/DetailRequeteHook";
import { RMCAuto } from "../../rechercheMultiCriteres/autoActesInscriptions/RMCAuto";
import { RMCRequetesAssocieesResultats } from "../../rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
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
  const { idRequeteParam } = useParams<TUuidRequeteParams>();
  const [affichageBoutonPrendreEnCharge, setAffichageBoutonPrendreEnCharge] =
    useState(false);

  const [paramsMAJReqInfo, setParamsMAJReqInfo] =
    useState<ICreationActionMiseAjourStatutHookParams>();

  const estModeConsultation = props.idRequeteAAfficher !== undefined;

  useCreationActionMiseAjourStatut(paramsMAJReqInfo);

  const location = useLocation();

  const { detailRequeteState } =
    useAvecRejeuDetailRequeteApiHook(detailRequeteParams);

  useEffect(() => {
    // L'idRequete peut venir de l'URL ou bien être une props dans le cas d'une requete liée
    if (props.idRequeteAAfficher) {
      setDetailRequeteParams({ idRequete: props.idRequeteAAfficher });
    } else {
      setDetailRequeteParams({
        idRequete: idRequeteParam,
        estConsultation: location.pathname.includes(URL_RECHERCHE_REQUETE)
      });
    }
  }, [idRequeteParam, props.idRequeteAAfficher, location.pathname]);

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

  useTitreDeLaFenetre("Aperçu requête d'information");

  return (
    <div className="ApercuRequete">
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
              {!estModeConsultation && !affichageBoutonPrendreEnCharge && (
                <RMCRequetesAssocieesResultats requete={requete} />
              )}
              <SuiviActionsRequete
                actions={requete.actions}
              ></SuiviActionsRequete>
            </div>
            <div className="side right">
              {!estModeConsultation && !affichageBoutonPrendreEnCharge && (
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
    appartientAMonServiceOuServicesParentsOuServicesFils(requete.idService);

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
