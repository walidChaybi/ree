import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { TUuidRequeteParams } from "@model/params/TUuidRequeteParams";
import { Requete, TRequete } from "@model/requete/IRequete";
import { IRequeteInformation } from "@model/requete/IRequeteInformation";
import { EStatutRequete } from "@model/requete/enum/StatutRequete";
import { ProtectionApercu } from "@util/route/Protection/ProtectionApercu";
import { BandeauRequete } from "@views/common/composant/bandeauApercuRequete/BandeauApercuRequete";
import { HistoriqueActionsRequete } from "@views/common/composant/suivis/HistoriqueActionsRequete";
import { SuiviObservationsRequete } from "@views/common/composant/suivis/SuiviObservationsRequete";
import { ICreationActionEtMiseAjourStatutParams, usePostCreationActionEtMiseAjourStatutApi } from "@views/common/hook/requete/ActionHook";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import AccessibleAvecDroits from "../../../../composants/commun/accessibleAvecDroits/AccessibleAvecDroits";
import TableauRMCRequetesAssociees from "../../../../composants/pages/rmc/TableauRMCRequetesAssociees";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";
import { IDetailRequeteParams, useAvecRejeuDetailRequeteApiHook } from "../../../common/hook/requete/DetailRequeteHook";
import { TableauRMC } from "../../rechercheMultiCriteres/autoActesInscriptions/TableauRMC";
import { ReponseReqInfo } from "./contenu/ReponseReqInfo";
import { ResumeReqInfo } from "./contenu/ResumeReqInfo";
import "./scss/ApercuReqInfoPage.scss";

interface ApercuReqInfoPageProps {
  idRequeteAAfficher?: string;
}

export const ApercuReqInfoPage: React.FC<ApercuReqInfoPageProps> = props => {
  const [detailRequeteParams, setDetailRequeteParams] = useState<IDetailRequeteParams>();
  const [requete, setRequete] = useState<IRequeteInformation>();
  const { idRequeteParam } = useParams<TUuidRequeteParams>();
  const [affichageBoutonPrendreEnCharge, setAffichageBoutonPrendreEnCharge] = useState(false);

  const [paramsMAJReqInfo, setParamsMAJReqInfo] = useState<ICreationActionEtMiseAjourStatutParams>();

  const estModeConsultation = props.idRequeteAAfficher !== undefined;

  usePostCreationActionEtMiseAjourStatutApi(paramsMAJReqInfo);

  const location = useLocation();

  const { utilisateurConnecte } = useContext(RECEContextData);

  const { detailRequeteState } = useAvecRejeuDetailRequeteApiHook(detailRequeteParams);

  useEffect(() => {
    // L'idRequete peut venir de l'URL ou bien être une props dans le cas d'une requete liée
    if (props.idRequeteAAfficher) {
      setDetailRequeteParams({ idRequete: props.idRequeteAAfficher });
    } else {
      setDetailRequeteParams({
        idRequete: idRequeteParam
      });
    }
  }, [idRequeteParam, props.idRequeteAAfficher, location.pathname]);

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteInformation);
      if (props.idRequeteAAfficher === undefined) {
        // Si l'id de la requête n'est pas fourni par les props (on n'est pas dans une fenêtre externe)
        setAffichageBoutonPrendreEnCharge(priseEnChargePossible(utilisateurConnecte, detailRequeteState));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailRequeteState]);

  const onclickPrendreEnCharge = useCallback(() => {
    if (detailRequeteParams && Requete.estDeTypeInformation(detailRequeteState)) {
      setParamsMAJReqInfo({
        libelleAction: EStatutRequete.PRISE_EN_CHARGE,
        statutRequete: "PRISE_EN_CHARGE",
        requeteId: detailRequeteState?.id,
        callback: () => {
          setDetailRequeteParams({ idRequete: detailRequeteParams.idRequete });
        }
      });
    }
  }, [detailRequeteParams, detailRequeteState]);

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
              <AccessibleAvecDroits auMoinsUnDesDroits={[Droit.CONSULTER]}>
                {!estModeConsultation && !affichageBoutonPrendreEnCharge && (
                  <TableauRMCRequetesAssociees titulairesRequete={requete.titulaires} />
                )}
              </AccessibleAvecDroits>
              <HistoriqueActionsRequete actions={requete.actions}></HistoriqueActionsRequete>
            </div>
            <div className="side right">
              {!estModeConsultation && !affichageBoutonPrendreEnCharge && (
                <TableauRMC requete={detailRequeteState as IRequeteInformation} />
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

const priseEnChargePossible = (utilisateurConnecte: UtilisateurConnecte, requete: TRequete) => {
  let estPriseEnChargePossible = false;
  const estDansMaStructureDeService = [
    utilisateurConnecte.idService,
    ...utilisateurConnecte.idServicesFils,
    ...utilisateurConnecte.idServicesParent
  ].includes(requete.idService);

  if (
    Requete.estDeTypeInformation(requete) &&
    Requete.estATraiterOuEstATransferer(requete) &&
    estDansMaStructureDeService &&
    Requete.nAppartientAPersonne(requete)
  ) {
    estPriseEnChargePossible = true;
  }

  return estPriseEnChargePossible;
};
