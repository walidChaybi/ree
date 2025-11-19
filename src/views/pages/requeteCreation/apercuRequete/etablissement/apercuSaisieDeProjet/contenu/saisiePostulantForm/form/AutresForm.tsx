import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { TypeDeclarant } from "@model/requete/enum/TypeDeclarant";
import { TypeReconnaissance } from "@model/requete/enum/TypeReconnaissance";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import { OptionVide, SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { FormikComponentProps, NB_CARACT_MAX_SAISIE, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import {
  ADRESSE,
  ARRONDISSEMENT,
  AUTRE_DECLARANT,
  DECLARANT,
  DEPARTEMENT,
  PAYS,
  RECONNAISSANCE,
  VILLE
} from "../../../../../../../../common/composant/formulaire/ConstantesNomsForm";
import LieuForm, { ILieuProps } from "../../../../../../../../common/composant/formulaire/LieuForm";
import Item from "../../../../commun/resumeRequeteCreationEtablissement/items/Item";

interface IAutresFormProps {
  nom: string;
}
type AutresFormProps = IAutresFormProps & FormikComponentProps;

const AutresForm: React.FC<AutresFormProps> = props => {
  const villeNamespace = withNamespace(props.nom, VILLE);
  const declarantNamespace = withNamespace(props.nom, DECLARANT);
  const valeurDeclarant = props.formik.getFieldProps(declarantNamespace).value;
  const estVilleParis = LieuxUtils.estVilleParis(props.formik.getFieldProps(villeNamespace).value);
  const adresseTitulaire: ILieuProps = {
    lieu: (
      <RadioField
        name={withNamespace(props.nom, ADRESSE)}
        label={"Adresse du titulaire"}
        values={EtrangerFrance.getAllEnumsAsOptions()}
      />
    ),
    ville: (
      <InputField
        name={villeNamespace}
        label={"Ville"}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
    ),
    arrondissement: (
      <SelectField
        name={withNamespace(props.nom, ARRONDISSEMENT)}
        label={"Arrondissement"}
        options={LieuxUtils.getOptionsArrondissement(props.formik.getFieldProps(villeNamespace).value)}
        optionVide={OptionVide.SELECTIONNABLE}
      />
    ),
    departement: (
      <InputField
        name={withNamespace(props.nom, DEPARTEMENT)}
        label={"Département"}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
    ),
    pays: (
      <InputField
        name={withNamespace(props.nom, PAYS)}
        label={`Pays`}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
    )
  };

  return (
    <Item titre={"Autres"}>
      <LieuForm
        elements={adresseTitulaire}
        afficherArrondissement={estVilleParis}
        afficherDepartement={!estVilleParis}
      />
      <SelectField
        name={withNamespace(props.nom, RECONNAISSANCE)}
        label={"Reconnaissance"}
        options={TypeReconnaissance.getAllEnumsAsOptions()}
        optionVide={OptionVide.SELECTIONNABLE}
      />
      <SelectField
        name={declarantNamespace}
        label={"Déclarant(s)"}
        options={TypeDeclarant.getAllEnumsAsOptions()}
        optionVide={OptionVide.SELECTIONNABLE}
      />
      {TypeDeclarant.estAutre(valeurDeclarant) && (
        <InputField
          name={withNamespace(props.nom, AUTRE_DECLARANT)}
          label={"Autre déclarant"}
          maxLength={"200"}
        />
      )}
    </Item>
  );
};

export default connect<IAutresFormProps>(AutresForm);
