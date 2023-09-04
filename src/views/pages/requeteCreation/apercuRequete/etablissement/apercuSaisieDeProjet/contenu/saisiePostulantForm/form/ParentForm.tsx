import { NOM, SEXE } from "@composant/formulaire/ConstantesNomsForm";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IParent } from "@model/requete/IParents";
import Item from "@pages/requeteCreation/apercuRequete/etablissement/commun/resumeRequeteCreationEtablissement/items/Item";
import { getLibelle } from "@util/Utils";
import { InputField } from "@widget/formulaire/champsSaisie/InputField";
import { RadioField } from "@widget/formulaire/champsSaisie/RadioField";
import { MessageAvertissement } from "@widget/formulaire/erreur/MessageAvertissement";
import {
  FormikComponentProps,
  NB_CARACT_MAX_SAISIE,
  withNamespace
} from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import React from "react";
interface IParentFormProps {
  nom: string;
  parent: IParent;
}

type ParentFormProps = IParentFormProps & FormikComponentProps;

const ParentForm: React.FC<ParentFormProps> = props => {
  return (
    <Item titre={props.nom}>
      <InputField
        name={withNamespace(props.nom, NOM)}
        label={getLibelle("Nom")}
        maxLength={NB_CARACT_MAX_SAISIE}
      />
      <InputField
        name={withNamespace(props.nom, NOM)}
        label={getLibelle("Prénom")}
      />
      <div className="AvertissementConteneur">
        <RadioField
          name={withNamespace(props.nom, SEXE)}
          label={getLibelle("Sexe")}
          values={Sexe.getAllEnumsAsOptionsSansInconnu()}
        />
        <MessageAvertissement afficherMessage={true}>
          {getLibelle("Attention, sexe indéterminé")}
        </MessageAvertissement>
      </div>
    </Item>
  );
};

export default connect<IParentFormProps>(ParentForm);
