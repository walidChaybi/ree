import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IRequeteInformation } from "../../../../model/requete/v2/IRequeteInformation";
import { IUuidRequeteParams } from "../../../../model/requete/v2/IUuidRequeteParams";
import { ProtectionApercu } from "../../../common/util/route/Protection/ProtectionApercu";
import { getLibelle } from "../../../common/widget/Text";
import { BandeauRequete } from "../../apercuRequete/contenu/BandeauRequete";
import { useDetailRequeteApiHook } from "../../detailRequete/hook/DetailRequeteHook";
import { RMCAuto } from "../../rechercheMultiCriteres/autoActesInscriptions/RMCAuto";
import { ReponseReqInfo } from "./contenu/ReponseReqInfo";
import { ResumeReqInfo } from "./contenu/ResumeReqInfo";
import "./scss/ApercuReqInfoPage.scss";

export const ApercuReqInfoPage: React.FC = () => {
  const { idRequete } = useParams<IUuidRequeteParams>();
  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);

  const [requete, setRequete] = useState<IRequeteInformation>();

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
        >
          <BandeauRequete detailRequete={requete} />
          <div className="contenuRequeteInfo">
            <div className="side left">
              <ResumeReqInfo requete={requete} />
            </div>
            <div className="side right">
              <RMCAuto requete={detailRequeteState} />
              <ReponseReqInfo requete={requete} />
            </div>
          </div>
        </ProtectionApercu>
      )}
    </div>
  );
};
