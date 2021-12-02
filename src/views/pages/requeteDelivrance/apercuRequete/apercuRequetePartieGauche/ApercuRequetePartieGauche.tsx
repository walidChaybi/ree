import React from "react";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import { IDocumentReponse } from "../../../../../model/requete/v2/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import { SuiviActionsRequete } from "../../../../common/composant/suivis/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../../../../common/composant/suivis/SuiviObservationRequete";
import { RMCRequetesAssocieesResultats } from "../../../rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import { DocumentsReponses } from "./contenu/document/DocumentsReponses";
import { ResumeRequeteV2 } from "./contenu/resume/ResumeRequeteV2";

interface ApercuRequetePartieGaucheProps {
  requete: IRequeteDelivrance;
  onClickDocumentAffiche?: (docReponse: IDocumentReponse) => void;
}

export const ApercuRequetePartieGauche: React.FC<ApercuRequetePartieGaucheProps> = props => {
  return (
    <div className="side left">
      <ResumeRequeteV2 requete={props.requete} />
      {props.requete?.statutCourant.statut ===
        StatutRequete.PRISE_EN_CHARGE && (
        <RMCRequetesAssocieesResultats requete={props.requete} />
      )}
      <SuiviObservationsRequete observations={props.requete.observations} />
      <SuiviActionsRequete actions={props.requete?.actions} />
      <DocumentsReponses
        requete={props.requete}
        onClickDocumentAffiche={props.onClickDocumentAffiche}
      />
    </div>
  );
};
