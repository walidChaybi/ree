import { NOM, PRENOMS } from "@composant/formulaire/ConstantesNomsForm";
import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { getLibelle, ZERO } from "@util/Utils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import {
  FormikComponentProps,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
import Item from "../../../../commun/resumeRequeteCreationEtablissement/items/Item";
import { filtrePrenomsFrancises } from "../SaisiePostulantFormUtils";

interface IFrancisationPostulantFormProps {
  nom: string;
  retenueSdanf?: IRetenueSdanf;
}

type FrancisationPostulantFormProps = IFrancisationPostulantFormProps &
  FormikComponentProps;

export const FrancisationPostulantForm: React.FC<
  FrancisationPostulantFormProps
> = props => {
  const nomChampNom = withNamespace(props.nom, NOM);
  const nomChampPrenom = withNamespace(props.nom, PRENOMS);

  const estAfficheChampNom = Boolean(
    props.formik.getFieldProps(nomChampNom).value
  );
  const estAfficheChampPrenom =
    filtrePrenomsFrancises(props.retenueSdanf?.prenomsRetenu).length > ZERO;

  return (
    <Item
      titre={getLibelle("Francisation postulant")}
      visible={estAfficheChampNom || estAfficheChampPrenom}
    >
      {estAfficheChampNom && (
        <InputField
          name={nomChampNom}
          disabled={true}
          label={getLibelle("Nom francisé")}
        />
      )}
      {estAfficheChampPrenom && (
        <InputField
          name={nomChampPrenom}
          disabled={true}
          label={getLibelle("Prénoms francisés")}
        />
      )}
    </Item>
  );
};

export default connect<IFrancisationPostulantFormProps>(
  FrancisationPostulantForm
);
