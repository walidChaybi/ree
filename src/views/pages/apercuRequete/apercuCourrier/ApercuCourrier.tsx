import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { IUuidRequeteParams } from "../../../../model/requete/v2/IUuidRequeteParams";
import { IResultatRMCActe } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { ProtectionApercu } from "../../../common/util/route/Protection/ProtectionApercu";
import { getLibelle } from "../../../common/widget/Text";
import { useDetailRequeteApiHook } from "../../detailRequete/hook/DetailRequeteHook";
import { BandeauRequete } from "../contenu/BandeauRequete";
import { DocumentsReponses } from "../contenu/document/DocumentsReponses";
import { SuiviActionsRequete } from "../contenu/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../contenu/SuiviObservationRequete";
import { ResumeRequeteV2 } from "../resume/ResumeRequeteV2";
import { Courrier } from "./contenu/Courrier";

export const ApercuCourrier: React.FC = () => {
  const { idRequete } = useParams<IUuidRequeteParams>();

  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);

  const history = useHistory();

  const [acte] = useState<IResultatRMCActe | undefined>(
    history.location.state as IResultatRMCActe
  );

  const [requete, setRequete] = useState<IRequeteDelivrance>();
  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteDelivrance);
    }
  }, [detailRequeteState]);

  return (
    <div className="ApercuCourrierAccompagnement">
      <title>{getLibelle("Aperçu de la requête")}</title>
      {requete && (
        <ProtectionApercu
          statut={requete.statutCourant.statut}
          type={requete.type}
        >
          <BandeauRequete detailRequete={requete} />
          <div className="contenu-requete">
            <div className="side left">
              <ResumeRequeteV2 requete={requete}></ResumeRequeteV2>
              <SuiviActionsRequete
                actions={requete.actions}
              ></SuiviActionsRequete>
              <SuiviObservationsRequete
                observations={requete?.observations}
              ></SuiviObservationsRequete>
              <DocumentsReponses documents={requete.documentsReponses} />
            </div>
            <div className="side right">
              <Courrier requete={requete} acte={acte} />
            </div>
          </div>
        </ProtectionApercu>
      )}
    </div>
  );
};
