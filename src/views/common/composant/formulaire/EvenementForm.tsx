import { LIEU_EVENEMENT } from "@composant/formulaire/ConstantesNomsForm";
import LieuEvenementForm from "@composant/formulaire/LieuEvenementForm";
import { Evenement, IEvenement } from "@model/etatcivil/acte/IEvenement";
import { SaisirExtraitFormContext } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/saisirExtrait/SaisirExtraitForm";
import DateComposeForm from "@widget/formulaire/champsDate/DateComposeForm";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import React, { useContext } from "react";
import { DATE_EVENEMENT } from "../../../pages/requeteDelivrance/saisirRequete/modelForm/ISaisirRequetePageModel";
import "./scss/EvenementForm.scss";

interface EvenementFormProps {
  nom: string;
  evenement?: IEvenement;
  labelDate: string;
  labelLieu: string;
  afficheHeure: boolean;
  gestionEtrangerFrance: boolean;
  etrangerParDefaut: boolean;
}

export const EvenementForm: React.FC<EvenementFormProps> = props => {
  const { saisieVerrouillee } = useContext(SaisirExtraitFormContext);

  return (
    <div className="EvenementForm">
      <DateComposeForm
        nomDate={withNamespace(props.nom, DATE_EVENEMENT)}
        labelDate={props.labelDate}
        disabledJour={
          Evenement.estTotalementRenseigne(props.evenement) && saisieVerrouillee
        }
        disabledMois={
          Evenement.estTotalementRenseigne(props.evenement) && saisieVerrouillee
        }
        disabledAnnee={
          Evenement.estTotalementRenseigne(props.evenement) && saisieVerrouillee
        }
        disabledHeure={
          Evenement.estHeureRenseignee(props.evenement) && saisieVerrouillee
        }
        afficheHeure={props.afficheHeure}
        showCroixSuppression={false}
        anneeObligatoire={true}
      />
      <LieuEvenementForm
        nom={withNamespace(props.nom, LIEU_EVENEMENT)}
        label={props.labelLieu}
        evenement={props.evenement}
        validation={true}
        gestionEtrangerFrance={props.gestionEtrangerFrance}
        etrangerParDefaut={props.etrangerParDefaut}
      />
    </div>
  );
};
