import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IRequeteInformation } from "../../../../model/requete/IRequeteInformation";
import { IUuidRequeteParams } from "../../../../model/requete/IUuidRequeteParams";
import { BandeauRequete } from "../../../common/composant/bandeauApercuRequete/BandeauApercuRequete";
import { SuiviActionsRequete } from "../../../common/composant/suivis/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../../../common/composant/suivis/SuiviObservationRequete";
import { ProtectionApercu } from "../../../common/util/route/Protection/ProtectionApercu";
import { getLibelle } from "../../../common/util/Utils";
import { RMCAuto } from "../../rechercheMultiCriteres/autoActesInscriptions/RMCAuto";
import { RMCRequetesAssocieesResultats } from "../../rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import { useDetailRequeteApiHook } from "../../requeteDelivrance/detailRequete/hook/DetailRequeteHook";
import { ReponseReqInfo } from "./contenu/ReponseReqInfo";
import { ResumeReqInfo } from "./contenu/ResumeReqInfo";
import "./scss/ApercuReqInfoPage.scss";

interface ApercuReqInfoPageProps {
  idRequeteAAfficher?: string;
}

export const ApercuReqInfoPage: React.FC<ApercuReqInfoPageProps> = ({
  idRequeteAAfficher
}) => {
  const [idRequete, setIdRequete] = useState<string>();
  const [requete, setRequete] = useState<IRequeteInformation>();
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);

  useEffect(() => {
    // L'idRequete peut venir de l'URL ou bien être une props dans le cas d'une requete liée
    if (idRequeteAAfficher) {
      setIdRequete(idRequeteAAfficher);
    } else {
      setIdRequete(idRequeteParam);
    }
  }, [idRequeteParam, idRequeteAAfficher]);

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteInformation);
    }
  }, [detailRequeteState]);

  return (
    <div className="ApercuRequete">
      <title>{getLibelle("Aperçu requête d'information")}</title>
      {requete && (
        <ProtectionApercu
          statut={requete.statutCourant.statut}
          type={requete.type}
          forcePass={idRequeteAAfficher !== undefined}
        >
          <BandeauRequete requete={requete} />
          <div className="contenuRequeteInfo">
            <div className="side left">
              <ResumeReqInfo requete={requete} />
              {requete.observations && requete.observations.length > 0 && (
                <SuiviObservationsRequete
                  observations={requete.observations}
                  idRequete={requete.id}
                ></SuiviObservationsRequete>
              )}
              <RMCRequetesAssocieesResultats requete={requete} />
              <SuiviActionsRequete
                actions={requete.actions}
              ></SuiviActionsRequete>
            </div>
            <div className="side right">
              <RMCAuto requete={detailRequeteState} />
              <ReponseReqInfo
                requete={requete}
                disabled={idRequeteAAfficher !== undefined}
              />
            </div>
          </div>
        </ProtectionApercu>
      )}
    </div>
  );
};
