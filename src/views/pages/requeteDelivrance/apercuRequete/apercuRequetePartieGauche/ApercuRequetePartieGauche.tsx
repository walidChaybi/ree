import HistoriqueActionsRequete from "@composants/commun/suivi/HistoriqueActionsRequete";
import { Droit } from "@model/agent/enum/Droit";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SuiviObservationsRequete } from "@views/common/composant/suivis/SuiviObservationsRequete";
import React from "react";
import AccessibleAvecDroits from "../../../../../composants/commun/accessibleAvecDroits/AccessibleAvecDroits";
import TableauRMCRequetesAssociees from "../../../../../composants/pages/rmc/TableauRMCRequetesAssociees";
import { DocumentsReponses } from "./contenu/document/DocumentsReponses";
import { ResumeRequete } from "./contenu/resume/ResumeRequete";

interface ApercuRequetePartieGaucheProps {
  requete: IRequeteDelivrance;
  onClickDocumentAffiche?: (docReponse: IDocumentReponse) => void;
  disabled?: boolean;
}

export const ApercuRequetePartieGauche: React.FC<ApercuRequetePartieGaucheProps> = props => {
  const afficherResultatRequeteAssocieesResultats =
    props.requete?.statutCourant.statut === StatutRequete.PRISE_EN_CHARGE && !props.disabled;

  return (
    <div className="side left">
      <ResumeRequete
        requete={props.requete}
        disabledActions={props.disabled}
      />
      <AccessibleAvecDroits auMoinsUnDesDroits={[Droit.CONSULTER]}>
        {afficherResultatRequeteAssocieesResultats && <TableauRMCRequetesAssociees titulairesRequete={props.requete.titulaires} />}
      </AccessibleAvecDroits>
      <SuiviObservationsRequete
        observations={props.requete.observations}
        idRequete={props.requete.id}
        disabled={props.disabled}
      />
      <HistoriqueActionsRequete actions={props.requete?.actions} />
      <DocumentsReponses
        requete={props.requete}
        onClickDocumentAffiche={props.onClickDocumentAffiche}
      />
    </div>
  );
};
