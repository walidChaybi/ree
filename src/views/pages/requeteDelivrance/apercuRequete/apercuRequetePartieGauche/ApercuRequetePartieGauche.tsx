import { SuiviActionsRequete } from "@composant/suivis/SuiviActionsRequete";
import { SuiviObservationsRequete } from "@composant/suivis/SuiviObservationRequete";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import React from "react";
import { RMCRequetesAssocieesResultats } from "../../../rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import { DocumentsReponses } from "./contenu/document/DocumentsReponses";
import { ResumeRequete } from "./contenu/resume/ResumeRequete";

interface ApercuRequetePartieGaucheProps {
  requete: IRequeteDelivrance;
  onClickDocumentAffiche?: (docReponse: IDocumentReponse) => void;
  disabled?: boolean;
}

export const ApercuRequetePartieGauche: React.FC<
  ApercuRequetePartieGaucheProps
> = props => {

  const afficherResultatRequeteAssocieesResultats =
    props.requete?.statutCourant.statut === StatutRequete.PRISE_EN_CHARGE &&
    !props.disabled;

  return (
    <div className="side left">
      <ResumeRequete requete={props.requete} disabledActions={props.disabled} />
      {afficherResultatRequeteAssocieesResultats && (
        <RMCRequetesAssocieesResultats requete={props.requete} />
      )}
      <SuiviObservationsRequete
        observations={props.requete.observations}
        idRequete={props.requete.id}
        disabled={props.disabled}
      />
      <SuiviActionsRequete actions={props.requete?.actions} />
      <DocumentsReponses
        requete={props.requete}
        onClickDocumentAffiche={props.onClickDocumentAffiche}
      />
    </div>
  );
};
