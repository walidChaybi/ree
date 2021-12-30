import React from "react";
import { StatutRequete } from "../../../../../model/requete/enum/StatutRequete";
import { IDocumentReponse } from "../../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";
import { SuiviActionsRequete } from "../../../../common/composant/suivis/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../../../../common/composant/suivis/SuiviObservationRequete";
import { RMCRequetesAssocieesResultats } from "../../../rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import { DocumentsReponses } from "./contenu/document/DocumentsReponses";
import { ResumeRequete } from "./contenu/resume/ResumeRequete";

interface ApercuRequetePartieGaucheProps {
  requete: IRequeteDelivrance;
  onClickDocumentAffiche?: (docReponse: IDocumentReponse) => void;
}

export const ApercuRequetePartieGauche: React.FC<ApercuRequetePartieGaucheProps> = props => {
  return (
    <div className="side left">
      <ResumeRequete requete={props.requete} />
      {props.requete?.statutCourant.statut ===
        StatutRequete.PRISE_EN_CHARGE && (
        <RMCRequetesAssocieesResultats requete={props.requete} />
      )}
      <SuiviObservationsRequete
        observations={props.requete.observations}
        idRequete={props.requete.id}
      />
      <SuiviActionsRequete actions={props.requete?.actions} />
      <DocumentsReponses
        requete={props.requete}
        onClickDocumentAffiche={props.onClickDocumentAffiche}
      />
    </div>
  );
};
