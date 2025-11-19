import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { TitulaireActe } from "@model/etatcivil/acte/TitulaireActe";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { estRenseigne, mapPrenomsVersPrenomsOrdonnes } from "@util/Utils";
import { EvenementForm } from "@views/common/composant/formulaire/EvenementForm";
import { CheckboxField } from "@widget/formulaire/champsSaisie/CheckBoxField";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import { FormikComponentProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React, { useContext } from "react";
import {
  ADOPTE_PAR,
  DECLARATION_CONJOINTE,
  EVENEMENT,
  NOM_NAISSANCE,
  NOM_SECABLE,
  PRENOMS,
  SEXE
} from "../../../../../../../../common/composant/formulaire/ConstantesNomsForm";
import DeclarationConjointeForm from "../../../../../../../../common/composant/formulaire/DeclarationConjointeForm";
import NomSecableForm from "../../../../../../../../common/composant/formulaire/NomSecableForm";
import PrenomsForm from "../../../../../../../../common/composant/formulaire/nomsPrenoms/PrenomsForm";
import { SaisirExtraitFormContext } from "../../SaisirExtraitForm";
import { EvenementNaissanceAgeDeForm } from "./EvenementNaissanceAgeDeForm";
import { getLabels } from "./LabelsUtil";
import "./scss/TitulaireEvenementForm.scss";

interface TitulaireEvenementFormPops {
  nom: string;
  titulaire: TitulaireActe;
  evenement?: IEvenement;
  natureActe: keyof typeof ENatureActe;
  gestionEtrangerFrance: boolean;
  etrangerParDefaut: boolean;
}

const TitulaireEvenementForm: React.FC<TitulaireEvenementFormPops & FormikComponentProps> = props => {
  const { setAfficheParentsAdoptantsTitulaire, saisieVerrouillee } = useContext(SaisirExtraitFormContext);
  const prenoms: IPrenomOrdonnes[] = mapPrenomsVersPrenomsOrdonnes(props.titulaire.prenoms);

  return (
    <div className="TitulaireEvenementForm">
      <InputField
        label="Nom de naissance"
        name={withNamespace(props.nom, NOM_NAISSANCE)}
        disabled={estRenseigne(props.titulaire.nom) && saisieVerrouillee}
      />
      {props.natureActe !== "DECES" && (
        <NomSecableForm
          nomComposant={withNamespace(props.nom, NOM_SECABLE)}
          nomTitulaire={props.titulaire.nom ?? undefined}
          origineTitulaireActe={props.titulaire.origineNomPartiesTitulaireActe ?? undefined}
          saisieVerrouillee={saisieVerrouillee}
        />
      )}
      {props.natureActe === "NAISSANCE" && (
        <DeclarationConjointeForm
          nom={withNamespace(props.nom, DECLARATION_CONJOINTE)}
          type={props.titulaire.typeDeclarationConjointe}
          date={props.titulaire.dateDeclarationConjointe ? new Date(props.titulaire.dateDeclarationConjointe.versTimestamp()) : undefined}
          origineTitulaireActe={props.titulaire.origineDeclarationConjointeTitulaireActe}
          saisieVerrouillee={saisieVerrouillee}
        />
      )}

      <PrenomsForm
        nom={withNamespace(props.nom, PRENOMS)}
        nbPrenoms={prenoms.length}
        disabled={estRenseigne(props.titulaire.prenoms) && saisieVerrouillee}
        prenom1Obligatoire={true}
      />

      <RadioField
        name={withNamespace(props.nom, SEXE)}
        label={"Sexe"}
        values={Sexe.getAllEnumsAsOptionsSansInconnu()}
        disabled={props.titulaire.sexe !== "INCONNU" && saisieVerrouillee}
      />

      {props.natureActe === "MARIAGE" ? (
        <>
          <EvenementNaissanceAgeDeForm
            nom={withNamespace(props.nom, EVENEMENT)}
            age={props.titulaire.age ?? undefined}
            naissance={props.evenement}
            gestionEtrangerFrance={props.gestionEtrangerFrance}
            etrangerParDefaut={props.etrangerParDefaut}
            saisieVerrouillee={saisieVerrouillee}
          />
          <CheckboxField
            name={withNamespace(props.nom, ADOPTE_PAR)}
            label={"Adopté par"}
            values={[{ libelle: "", cle: "true" }]}
            disabled={
              Boolean(props.titulaire.filiations.find(filiation => filiation.lienParente === "PARENT_ADOPTANT")?.nom) && saisieVerrouillee
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAfficheParentsAdoptantsTitulaire(props.formik, props.nom, e.target.checked);
              props.formik.handleChange(e);
            }}
          />
        </>
      ) : (
        <EvenementForm
          nom={withNamespace(props.nom, EVENEMENT)}
          labelDate={getLabels("NAISSANCE").dateEvenement}
          labelLieu={getLabels("NAISSANCE").lieuEvenement}
          evenement={props.evenement}
          afficheHeure={props.natureActe === "NAISSANCE"}
          gestionEtrangerFrance={props.gestionEtrangerFrance}
          etrangerParDefaut={props.etrangerParDefaut}
          saisieVerrouillee={saisieVerrouillee}
        />
      )}
    </div>
  );
};

export default connect<TitulaireEvenementFormPops>(TitulaireEvenementForm);
