import {
  ADRESSE,
  ARRONDISSEMENT,
  AUTRE_DECLARANT,
  DECLARANT,
  DEPARTEMENT,
  PAYS,
  RECONNAISSANCE,
  VILLE
} from "@composant/formulaire/ConstantesNomsForm";
import LieuForm, { ILieuProps } from "@composant/formulaire/LieuForm";
import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { TypeDeclarant } from "@model/requete/enum/TypeDeclarant";
import { TypeReconnaissance } from "@model/requete/enum/TypeReconnaissance";
import { getLibelle } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import {
  OptionVide,
  SelectField
} from "@widget/formulaire/champsSaisie/SelectField";
import {
  DEUX_CENT_CARACT_MAX,
  FormikComponentProps,
  NB_CARACT_MAX_SAISIE,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import Item from "../../../../commun/resumeRequeteCreationEtablissement/items/Item";

interface IAutresFormProps {
  nom: string;
}
type AutresFormProps = IAutresFormProps & FormikComponentProps;

const AutresForm: React.FC<AutresFormProps> = props => {
  const villeNamespace = withNamespace(props.nom, VILLE);
  const declarantNamespace = withNamespace(props.nom, DECLARANT);
  const valeurDeclarant = props.formik.getFieldProps(declarantNamespace).value;
  const estVilleParis = LieuxUtils.estVilleParis(
    props.formik.getFieldProps(villeNamespace).value
  );
  const adresseTitulaire: ILieuProps = {
    lieu: (
      <RadioField
        name={withNamespace(props.nom, ADRESSE)}
        label={getLibelle("Adresse du titulaire")}
        values={EtrangerFrance.getAllEnumsAsOptions()}
      />
    ),
    ville: (
      <InputField
        name={villeNamespace}
        label={getLibelle("Ville")}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
    ),
    arrondissement: (
      <SelectField
        name={withNamespace(props.nom, ARRONDISSEMENT)}
        label={getLibelle("Arrondissement")}
        options={LieuxUtils.getOptionsArrondissement(
          props.formik.getFieldProps(villeNamespace).value
        )}
      />
    ),
    departement: (
      <InputField
        name={withNamespace(props.nom, DEPARTEMENT)}
        label={getLibelle("Département")}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
    ),
    pays: (
      <InputField
        name={withNamespace(props.nom, PAYS)}
        label={getLibelle(`Pays`)}
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
        label={getLibelle("Reconnaissance")}
        options={TypeReconnaissance.getAllEnumsAsOptions()}
        optionVide={OptionVide.SELECTIONNABLE}
      />
      <SelectField
        name={declarantNamespace}
        label={getLibelle("Déclarant(s)")}
        options={TypeDeclarant.getAllEnumsAsOptions()}
        optionVide={OptionVide.SELECTIONNABLE}
      />
      {TypeDeclarant.estAutre(valeurDeclarant) && (
        <InputField
          name={withNamespace(props.nom, AUTRE_DECLARANT)}
          label={getLibelle("Autre déclarant")}
          maxLength={DEUX_CENT_CARACT_MAX}
        />
      )}
    </Item>
  );
};

export default connect<IAutresFormProps>(AutresForm);
