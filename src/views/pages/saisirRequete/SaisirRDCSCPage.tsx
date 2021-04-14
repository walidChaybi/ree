import React, { useState } from "react";
import { SousTypeDelivrance } from "../../../model/requete/v2/enum/SousTypeDelivrance";
import { Formulaire } from "../../common/widget/formulaire/Formulaire";
import * as Yup from "yup";
import IdentiteForm, {
  IdentiteFormDefaultValues,
  IdentiteFormValidationSchema
} from "./sousFormulaires/identite/IdentiteForm";
import AdresseForm, {
  AdresseFormDefaultValues,
  AdresseFormValidationSchema
} from "./sousFormulaires/adresse/AdresseForm";
import RequerantForm, {
  RequerantFormDefaultValues,
  RequerantFormValidationSchema
} from "./sousFormulaires/requerant/RequerantForm";
import { getLibelle } from "../../common/widget/Text";
import { SelectField } from "../../common/widget/formulaire/champsSaisie/SelectField";
import { Options } from "../../common/util/Type";
import "./scss/SaisirRDCSCPage.scss";
import { SubFormProps } from "../../common/widget/formulaire/utils/FormUtil";
import SaisirRequeteBoutons, {
  SaisirRequeteBoutonsProps
} from "./boutons/SaisirRequeteBoutons";
import { DOCUMENT_OBLIGATOIRE } from "../../common/widget/formulaire/FormulaireMessages";
import { DocumentDelivrance } from "../../../model/requete/v2/enum/DocumentDelivrance";

// Nom des sous-formulaires
export const DOCUMENT = "document";
export const INTERESSE = "interesse";
export const REQUERANT = "requerant";
export const ADRESSE = "adresse";

// Valeurs par défaut des champs
const DefaultValuesSaisirRDCSC = {
  [DOCUMENT]: "",
  [INTERESSE]: IdentiteFormDefaultValues,
  [REQUERANT]: RequerantFormDefaultValues,
  [ADRESSE]: AdresseFormDefaultValues
};

// Schéma de validation en sortie de champs
const ValidationSchemaSaisirRDCSC = Yup.object({
  [DOCUMENT]: Yup.string().required(DOCUMENT_OBLIGATOIRE),
  [INTERESSE]: IdentiteFormValidationSchema,
  [REQUERANT]: RequerantFormValidationSchema,
  [ADRESSE]: AdresseFormValidationSchema
});

export const titreForm = SousTypeDelivrance.getEnumFor("RDCSC").libelle;

export const SaisirRDCSCPage: React.FC = () => {
  const [documentDemandeOptions, setDocumentDemandeOptions] = useState<Options>(
    []
  );

  useState(async () => {
    const documentDelivrance = await DocumentDelivrance.getAllCertificatSituation();
    setDocumentDemandeOptions(documentDelivrance);
  });

  const blocsForm: JSX.Element[] = [
    getDocumentDemande(documentDemandeOptions),
    getInteresseForm(),
    getRequerantForm(),
    getAdresseForm()
  ];

  const onSubmitSaisirRDCSC = (values: any) => {};

  const boutonsProps = {} as SaisirRequeteBoutonsProps;

  return (
    <>
      <title>{titreForm}</title>
      <Formulaire
        titre={titreForm}
        formDefaultValues={DefaultValuesSaisirRDCSC}
        formValidationSchema={ValidationSchemaSaisirRDCSC}
        onSubmit={onSubmitSaisirRDCSC}
        className="FormulaireSaisirRDCSC"
      >
        <div>{blocsForm}</div>
        <SaisirRequeteBoutons {...boutonsProps} />
      </Formulaire>
    </>
  );
};

function getDocumentDemande(documentDemandeOptions: Options): JSX.Element {
  return (
    <div className="DocumentInput" key={DOCUMENT}>
      <SelectField
        name={DOCUMENT}
        label={getLibelle("Document demandé")}
        options={documentDemandeOptions}
      />
    </div>
  );
}

function getInteresseForm(): JSX.Element {
  const interesseFormProps = {
    nom: INTERESSE,
    titre: getLibelle("Intéressé")
  } as SubFormProps;
  return <IdentiteForm key={INTERESSE} {...interesseFormProps} />;
}

function getRequerantForm(): JSX.Element {
  const requerantFromProps = {
    nom: REQUERANT,
    titre: getLibelle("Identité du requérant")
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
