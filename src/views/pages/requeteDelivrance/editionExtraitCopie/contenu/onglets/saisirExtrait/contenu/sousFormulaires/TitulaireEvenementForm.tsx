import {
  DECLARATION_CONJOINTE,
  EVENEMENT,
  NOM_NAISSANCE,
  NOM_SECABLE,
  PRENOMS,
  SEXE
} from "@composant/formulaire/ConstantesNomsForm";
import DeclarationConjointeForm from "@composant/formulaire/DeclarationConjointeForm";
import { EvenementForm } from "@composant/formulaire/EvenementForm";
import NomSecableForm from "@composant/formulaire/NomSecableForm";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import {
  ITitulaireActe,
  TitulaireActe
} from "@model/etatcivil/acte/ITitulaireActe";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { estRenseigne, getLibelle } from "@util/Utils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import React from "react";
import PrenomsForm from "../../../../../../saisirRequete/sousFormulaires/identite/nomsPrenoms/PrenomsForm";
import { getLabels } from "./LabelsUtil";
import "./scss/TitulaireEvenementForm.scss";

interface TitulaireEvenementFormPops {
  nom: string;
  titulaire: ITitulaireActe;
  evenement?: IEvenement;
  natureActe: NatureActe;
  gestionEtrangerFrance: boolean;
  etrangerParDefaut: boolean;
}

export const TitulaireEvenementForm: React.FC<
  TitulaireEvenementFormPops
> = props => {
  const prenoms: IPrenomOrdonnes[] =
    TitulaireActe.mapPrenomsVersPrenomsOrdonnes(props.titulaire);

  return (
    <>
      <div className="TitulaireEvenementForm">
        <InputField
          label="Nom de naissance"
          name={withNamespace(props.nom, NOM_NAISSANCE)}
          disabled={estRenseigne(props.titulaire.nom)}
        />
        {props.natureActe === NatureActe.NAISSANCE && (
          <>
            <NomSecableForm
              nomComposant={withNamespace(props.nom, NOM_SECABLE)}
              nomTitulaire={props.titulaire.nom}
              nomPartie1={props.titulaire.nomPartie1}
              nomPartie2={props.titulaire.nomPartie2}
              origineTitulaireActe={
                props.titulaire.origineNomPartiesTitulaireActe
              }
            />

            <DeclarationConjointeForm
              nom={withNamespace(props.nom, DECLARATION_CONJOINTE)}
              type={props.titulaire.typeDeclarationConjointe}
              date={props.titulaire.dateDeclarationConjointe}
              origineTitulaireActe={
                props.titulaire.origineDeclarationConjointeTitulaireActe
              }
            />
          </>
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

        <EvenementForm
          nom={withNamespace(props.nom, EVENEMENT)}
          labelDate={getLabels(NatureActe.NAISSANCE).dateEvenement}
          labelLieu={getLabels(NatureActe.NAISSANCE).lieuEvenement}
          evenement={props.evenement}
          afficheHeure={true}
          gestionEtrangerFrance={props.gestionEtrangerFrance}
          etrangerParDefaut={props.etrangerParDefaut}
        />
      </div>
    </>
  );
};
