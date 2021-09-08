import React from "react";
import * as Yup from "yup";
import { SousTypeDelivrance } from "../../../model/requete/v2/enum/SousTypeDelivrance";
import { TypeRequerantPacs } from "../../../model/requete/v2/enum/TypeRequerantPacs";
import AdresseForm, {
  AdresseFormDefaultValues,
  AdresseFormValidationSchema
} from "../../common/widget/formulaire/adresse/AdresseForm";
import { Formulaire } from "../../common/widget/formulaire/Formulaire";
import { SubFormProps } from "../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../common/widget/Text";
import SaisirRequeteBoutons, {
  SaisirRequeteBoutonsProps
} from "./boutons/SaisirRequeteBoutons";
import {
  ADRESSE,
  PARTENAIRE1,
  PARTENAIRE2,
  REQUERANT
} from "./modelForm/ISaisirRDAPCPageModel";
import "./scss/SaisirRequetePage.scss";
import IdentiteForm, {
  IdentiteFormDefaultValues,
  IdentiteFormValidationSchema,
  IdentiteSubFormProps
} from "./sousFormulaires/identite/IdentiteForm";
import RequerantForm, {
  PartenairesFormDefaultValues,
  RequerantFormValidationSchema
} from "./sousFormulaires/requerant/RequerantForm";

// Valeurs par défaut des champs
const DefaultValuesRDAPCRequete = {
  [PARTENAIRE1]: IdentiteFormDefaultValues,
  [PARTENAIRE2]: IdentiteFormDefaultValues,
  [REQUERANT]: PartenairesFormDefaultValues,
  [ADRESSE]: AdresseFormDefaultValues
};

// Schéma de validation en sortie de champs
const ValidationSchemaRDAPCRequete = Yup.object({
  [PARTENAIRE1]: IdentiteFormValidationSchema,
  [PARTENAIRE2]: IdentiteFormValidationSchema,
  [REQUERANT]: RequerantFormValidationSchema,
  [ADRESSE]: AdresseFormValidationSchema
});

export const titreForm = SousTypeDelivrance.getEnumFor("RDAPC").libelle;

export const SaisirRDAPCPage: React.FC = () => {
  const blocsForm: JSX.Element[] = [
    getPartenaire1Form(),
    getPartenaire2Form(),
    getRequerantForm(),
    getAdresseForm()
  ];

  const onSubmitSaisirRequete = (values: any, errors: any) => {};

  const boutonsProps = {} as SaisirRequeteBoutonsProps;

  return (
    <>
      <title>{titreForm}</title>
      <Formulaire
        titre={titreForm}
        formDefaultValues={DefaultValuesRDAPCRequete}
        formValidationSchema={ValidationSchemaRDAPCRequete}
        onSubmit={onSubmitSaisirRequete}
        className="FormulaireSaisirRDAPC"
      >
        <div>{blocsForm}</div>
        <SaisirRequeteBoutons {...boutonsProps} />
      </Formulaire>
    </>
  );
};

function getPartenaire1Form(): JSX.Element {
  const interesseFormProps = {
    nom: PARTENAIRE1,
    titre: getLibelle("Identité du premier partenaire")
  } as IdentiteSubFormProps;
  return <IdentiteForm key={PARTENAIRE1} {...interesseFormProps} />;
}

function getPartenaire2Form(): JSX.Element {
  const interesseFormProps = {
    nom: PARTENAIRE2,
    titre: getLibelle("Identité du second partenaire")
  } as IdentiteSubFormProps;
  return <IdentiteForm key={PARTENAIRE2} {...interesseFormProps} />;
}

function getRequerantForm(): JSX.Element {
  const requerantFromProps = {
    nom: REQUERANT,
    titre: getLibelle("Identité du requérant"),
    options: TypeRequerantPacs.getAllEnumsAsOptions()
  } as SubFormProps;
  return <RequerantForm key={REQUERANT} {...requerantFromProps} />;
}

function getAdresseForm(): JSX.Element {
  const adresseFormProps = {
    nom: ADRESSE,
    titre: getLibelle("Adresse postale du requérant")
  } as SubFormProps;
  return <AdresseForm key={ADRESSE} {...adresseFormProps} />;
}
