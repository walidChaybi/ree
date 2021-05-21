import React from "react";
import * as Yup from "yup";
import { SousTypeDelivrance } from "../../../model/requete/v2/enum/SousTypeDelivrance";
import { TypeRequerantPacs } from "../../../model/requete/v2/enum/TypeRequerantPacs";
import { Formulaire } from "../../common/widget/formulaire/Formulaire";
import { DOCUMENT_OBLIGATOIRE } from "../../common/widget/formulaire/FormulaireMessages";
import { SubFormProps } from "../../common/widget/formulaire/utils/FormUtil";
import { getLibelle } from "../../common/widget/Text";
import SaisirRequeteBoutons, {
  SaisirRequeteBoutonsProps
} from "./boutons/SaisirRequeteBoutons";
import "./scss/SaisirRequetePage.scss";
import AdresseForm, {
  AdresseFormDefaultValues,
  AdresseFormValidationSchema
} from "./sousFormulaires/adresse/AdresseForm";
import IdentiteForm, {
  IdentiteFormDefaultValues,
  IdentiteFormValidationSchema
} from "./sousFormulaires/identite/IdentiteForm";
import RequerantForm, {
  PartenairesFormDefaultValues,
  RequerantFormValidationSchema
} from "./sousFormulaires/requerant/RequerantForm";

// Nom des sous-formulaires
export const DOCUMENT = "document";
export const PARTENAIRE1 = "partenaire1";
export const PARTENAIRE2 = "partenaire2";
export const REQUERANT = "requerant";
export const ADRESSE = "adresse";

// Valeurs par défaut des champs
const DefaultValuesRDAPCRequete = {
  [DOCUMENT]: "",
  [PARTENAIRE1]: IdentiteFormDefaultValues,
  [PARTENAIRE2]: IdentiteFormDefaultValues,
  [REQUERANT]: PartenairesFormDefaultValues,
  [ADRESSE]: AdresseFormDefaultValues
};

// Schéma de validation en sortie de champs
const ValidationSchemaRDAPCRequete = Yup.object({
  [DOCUMENT]: Yup.string().required(DOCUMENT_OBLIGATOIRE),
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
  } as SubFormProps;
  return <IdentiteForm key={PARTENAIRE1} {...interesseFormProps} />;
}

function getPartenaire2Form(): JSX.Element {
  const interesseFormProps = {
    nom: PARTENAIRE2,
    titre: getLibelle("Identité du second partenaire")
  } as SubFormProps;
  return <IdentiteForm key={PARTENAIRE2} {...interesseFormProps} />;
}

function getRequerantForm(): JSX.Element {
  const requerantFromProps = {
    nom: REQUERANT,
    titre: getLibelle("Identité du requérant"),
    type: TypeRequerantPacs.getAllEnumsAsOptions()
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
