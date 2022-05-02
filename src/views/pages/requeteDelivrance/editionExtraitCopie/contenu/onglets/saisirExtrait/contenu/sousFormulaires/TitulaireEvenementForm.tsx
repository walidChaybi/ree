import React from "react";
import {
  Evenement,
  IEvenement
} from "../../../../../../../../../model/etatcivil/acte/IEvenement";
import {
  ITitulaireActe,
  TitulaireActe
} from "../../../../../../../../../model/etatcivil/acte/ITitulaireActe";
import { NatureActe } from "../../../../../../../../../model/etatcivil/enum/NatureActe";
import { Sexe } from "../../../../../../../../../model/etatcivil/enum/Sexe";
import { IPrenomOrdonnes } from "../../../../../../../../../model/requete/IPrenomOrdonnes";
import {
  DECLARATION_CONJOINTE,
  LIEU_EVENEMENT,
  NOM_NAISSANCE,
  NOM_SECABLE,
  PRENOMS,
  SEXE
} from "../../../../../../../../common/composant/formulaire/ConstantesNomsForm";
import DeclarationConjointeForm from "../../../../../../../../common/composant/formulaire/DeclarationConjointeForm";
import LieuEvenementForm from "../../../../../../../../common/composant/formulaire/LieuEvenementForm";
import NomSecableForm from "../../../../../../../../common/composant/formulaire/NomSecableForm";
import {
  estRenseigne,
  getLibelle
} from "../../../../../../../../common/util/Utils";
import DateComposeForm from "../../../../../../../../common/widget/formulaire/champsDate/DateComposeForm";
import { InputField } from "../../../../../../../../common/widget/formulaire/champsSaisie/InputField";
import { RadioField } from "../../../../../../../../common/widget/formulaire/champsSaisie/RadioField";
import { withNamespace } from "../../../../../../../../common/widget/formulaire/utils/FormUtil";
import { DATE_EVENEMENT } from "../../../../../../saisirRequete/modelForm/ISaisirRequetePageModel";
import PrenomsForm from "../../../../../../saisirRequete/sousFormulaires/identite/nomsPrenoms/PrenomsForm";
import "./scss/TitulaireEvenementForm.scss";

interface TitulaireEvenementFormPops {
  nom: string;
  titulaire: ITitulaireActe;
  evenement?: IEvenement;
  natureActe: NatureActe;
}

export const TitulaireEvenementForm: React.FC<
  TitulaireEvenementFormPops
> = props => {
  const prenoms: IPrenomOrdonnes[] =
    TitulaireActe.mapPrenomsVersPrenomsOrdonnes(props.titulaire);

  const labels = getLabels(props.natureActe);

  return (
    <>
      <div className="TitulaireEvenementForm">
        <InputField
          label="Nom de naissance"
          name={withNamespace(props.nom, NOM_NAISSANCE)}
          disabled={estRenseigne(props.titulaire.nom)}
        />
        <NomSecableForm
          nom={withNamespace(props.nom, NOM_SECABLE)}
          nomPartie1={props.titulaire.nomPartie1}
          nomPartie2={props.titulaire.nomPartie2}
          origineTitulaireActe={props.titulaire.origineNomPartiesTitulaireActe}
        />
        {props.natureActe === NatureActe.NAISSANCE && (
          <DeclarationConjointeForm
            nom={withNamespace(props.nom, DECLARATION_CONJOINTE)}
            type={props.titulaire.typeDeclarationConjointe}
            date={props.titulaire.dateDeclarationConjointe}
            origineTitulaireActe={
              props.titulaire.origineDeclarationConjointeTitulaireActe
            }
          />
        )}
        <PrenomsForm
          nom={withNamespace(props.nom, PRENOMS)}
          prenoms={prenoms}
          disabled={estRenseigne(props.titulaire.prenoms)}
          prenom1Obligatoire={true}
        />
        <RadioField
          name={withNamespace(props.nom, SEXE)}
          label={getLibelle("Sexe")}
          values={Sexe.getAllEnumsAsOptionsSansInconnu()}
          disabled={props.titulaire.sexe !== Sexe.INCONNU}
        />
        <DateComposeForm
          nomDate={withNamespace(props.nom, DATE_EVENEMENT)}
          labelDate={labels.dateEvenement}
          disabled={Evenement.estRenseigne(props.evenement)}
          disabledHeure={Evenement.estHeureRenseignee(props.evenement)}
          afficheHeure={true}
          showCroixSuppression={false}
          anneeObligatoire={true}
        />
        <LieuEvenementForm
          nom={withNamespace(props.nom, LIEU_EVENEMENT)}
          label={labels.lieuEvenement}
          evenement={props.evenement}
          validation={true}
        />
      </div>
    </>
  );
};

interface ILabel {
  dateEvenement: string;
  lieuEvenement: string;
}
function getLabels(natureActe: NatureActe) {
  const label: ILabel = { dateEvenement: "", lieuEvenement: "" };

  switch (natureActe) {
    case NatureActe.NAISSANCE:
      label.dateEvenement = getLibelle("Date de naissance");
      label.lieuEvenement = getLibelle("Lieu de naissance");
      break;
    case NatureActe.DECES:
      label.dateEvenement = getLibelle("Date de déces");
      label.lieuEvenement = getLibelle("Lieu de déces");
      break;

    case NatureActe.MARIAGE:
      label.dateEvenement = getLibelle("Date de mariage");
      label.lieuEvenement = getLibelle("Lieu de mariage");
      break;
    default:
      break;
  }

  return label;
}
