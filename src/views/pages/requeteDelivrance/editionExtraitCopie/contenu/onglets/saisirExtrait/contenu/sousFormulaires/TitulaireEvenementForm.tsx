import {
  ADOPTE_PAR,
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
import { CheckboxField } from "@widget/formulaire/champsSaisie/CheckBoxField";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import {
  FormikComponentProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useContext } from "react";
import PrenomsForm from "../../../../../../../../common/composant/formulaire/nomsPrenoms/PrenomsForm";
import { SaisirExtraitFormContext } from "../../SaisirExtraitForm";
import { EvenementNaissanceAgeDeForm } from "./EvenementNaissanceAgeDeForm";
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

const TitulaireEvenementForm: React.FC<
  TitulaireEvenementFormPops & FormikComponentProps
> = props => {
  const { setAfficheParentsAdoptantsTitulaire, saisieVerrouillee } = useContext(
    SaisirExtraitFormContext
  );
  const prenoms: IPrenomOrdonnes[] =
    TitulaireActe.mapPrenomsVersPrenomsOrdonnes(props.titulaire);

  return (
    <>
      <div className="TitulaireEvenementForm">
        <InputField
          label="Nom de naissance"
          name={withNamespace(props.nom, NOM_NAISSANCE)}
          disabled={estRenseigne(props.titulaire.nom) && saisieVerrouillee}
        />
        {props.natureActe !== NatureActe.DECES && (
          <NomSecableForm
            nomComposant={withNamespace(props.nom, NOM_SECABLE)}
            nomTitulaire={props.titulaire.nom}
            nomPartie1={props.titulaire.nomPartie1}
            nomPartie2={props.titulaire.nomPartie2}
            origineTitulaireActe={
              props.titulaire.origineNomPartiesTitulaireActe
            }
            saisieVerrouillee={saisieVerrouillee}
          />
        )}
        {props.natureActe === NatureActe.NAISSANCE && (
          <DeclarationConjointeForm
            nom={withNamespace(props.nom, DECLARATION_CONJOINTE)}
            type={props.titulaire.typeDeclarationConjointe}
            date={props.titulaire.dateDeclarationConjointe}
            origineTitulaireActe={
              props.titulaire.origineDeclarationConjointeTitulaireActe
            }
            saisieVerrouillee={saisieVerrouillee}
          />
        )}

        <PrenomsForm
          nom={withNamespace(props.nom, PRENOMS)}
          prenoms={prenoms}
          disabled={estRenseigne(props.titulaire.prenoms) && saisieVerrouillee}
          prenom1Obligatoire={true}
        />
        <RadioField
          name={withNamespace(props.nom, SEXE)}
          label={getLibelle("Sexe")}
          values={Sexe.getAllEnumsAsOptionsSansInconnu()}
          disabled={props.titulaire.sexe !== Sexe.INCONNU && saisieVerrouillee}
        />

        {props.natureActe === NatureActe.MARIAGE ? (
          <>
            <EvenementNaissanceAgeDeForm
              nom={withNamespace(props.nom, EVENEMENT)}
              age={props.titulaire.age}
              naissance={props.evenement}
              gestionEtrangerFrance={props.gestionEtrangerFrance}
              etrangerParDefaut={props.etrangerParDefaut}
              saisieVerrouillee={saisieVerrouillee}
            />
            <CheckboxField
              name={withNamespace(props.nom, ADOPTE_PAR)}
              label={getLibelle("Adopté par")}
              values={[{ str: "", value: "true" }]}
              disabled={
                estRenseigne(
                  TitulaireActe.getParentAdoptant1(props.titulaire)?.nom
                ) && saisieVerrouillee
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAfficheParentsAdoptantsTitulaire(
                  props.formik,
                  props.nom,
                  e.target.checked
                );
                props.formik.handleChange(e);
              }}
            />
          </>
        ) : (
          <EvenementForm
            nom={withNamespace(props.nom, EVENEMENT)}
            labelDate={getLabels(NatureActe.NAISSANCE).dateEvenement}
            labelLieu={getLabels(NatureActe.NAISSANCE).lieuEvenement}
            evenement={props.evenement}
            afficheHeure={props.natureActe === NatureActe.NAISSANCE}
            gestionEtrangerFrance={props.gestionEtrangerFrance}
            etrangerParDefaut={props.etrangerParDefaut}
            saisieVerrouillee={saisieVerrouillee}
          />
        )}
      </div>
    </>
  );
};

export default connect<TitulaireEvenementFormPops>(TitulaireEvenementForm);
