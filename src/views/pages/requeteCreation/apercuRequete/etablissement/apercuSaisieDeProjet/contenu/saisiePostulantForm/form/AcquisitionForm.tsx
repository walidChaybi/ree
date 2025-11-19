import { TypeNature } from "@model/requete/enum/TypeNature";
import { getLibelle } from "@util/Utils";
import { DATE, NATURE } from "@views/common/composant/formulaire/ConstantesNomsForm";
import Item from "@views/pages/requeteCreation/apercuRequete/etablissement/commun/resumeRequeteCreationEtablissement/items/Item";
import DateComposeForm from "@widget/formulaire/champsDate/DateComposeForm";
import { OptionVide, SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import { MessageAvertissement } from "@widget/formulaire/erreur/MessageAvertissement";
import { FormikComponentProps, withNamespace } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import { useState } from "react";

interface IAcquisitionFormProps {
  nom: string;
  estAvancementASigner: boolean;
}
type AcquisitionFormProps = IAcquisitionFormProps & FormikComponentProps;

const AcquisitionForm: React.FC<AcquisitionFormProps> = props => {
  const [afficherDateDecret, setAfficherDateDecret] = useState<boolean>(props.estAvancementASigner);
  const nature = props.formik.getFieldProps(withNamespace(props.nom, NATURE)).value;

  function onClickAfficherDecret() {
    setAfficherDateDecret(true);
  }

  return (
    <Item titre={"Acquisition"}>
      <div className="AvertissementConteneur">
        <SelectField
          name={withNamespace(props.nom, NATURE)}
          label={getLibelle("Nature")}
          options={TypeNature.getAllEnumsAsOptions()}
          optionVide={OptionVide.SELECTIONNABLE}
        />
        <MessageAvertissement afficherMessage={!nature && props.estAvancementASigner}>
          {getLibelle("La nature du décret n'est pas spécifiée")}
        </MessageAvertissement>
      </div>
      {!afficherDateDecret && (
        <button
          type="button"
          className="BoutonAffichage"
          onClick={onClickAfficherDecret}
        >
          {getLibelle("Ajouter date de décret")}
        </button>
      )}
      {afficherDateDecret && (
        <div className="ConteneurDateCompose">
          <DateComposeForm
            nomDate={withNamespace(props.nom, DATE)}
            labelDate={getLibelle("Date du décret")}
            anneeMax={new Date().getFullYear()}
            showCroixSuppression={false}
          />
        </div>
      )}
    </Item>
  );
};

export default connect<IAcquisitionFormProps>(AcquisitionForm);
