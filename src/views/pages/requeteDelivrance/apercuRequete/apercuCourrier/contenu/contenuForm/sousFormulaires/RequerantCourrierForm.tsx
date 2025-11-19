import { IRequerant, Requerant } from "@model/requete/IRequerant";
import { NOM, PRENOM, RAISON_SOCIALE, REQUERANT } from "@views/common/composant/formulaire/ConstantesNomsForm";
import { connect } from "formik";
import * as Yup from "yup";
import { SousFormulaire } from "../../../../../../../common/widget/formulaire/SousFormulaire";
import { InputField } from "../../../../../../../common/widget/formulaire/champsSaisie/InputField";
import { SubFormProps, withNamespace } from "../../../../../../../common/widget/formulaire/utils/FormUtil";

export interface IRequerantCourrierFormProps {
  requerant: IRequerant;
}

const MESSAGE_VALEUR_OBLIGATOIRE = "Au moins un champ de l'identité du requérant doit être rempli.";

export const RequerantCourrierFormValidationSchema = Yup.object().shape(
  {
    [PRENOM]: Yup.string().when([NOM, RAISON_SOCIALE], {
      is: (alpha: string, beta: string) => !alpha && !beta,
      then: Yup.string().required(MESSAGE_VALEUR_OBLIGATOIRE)
    })
  },
  [[NOM, RAISON_SOCIALE]]
);

const RequerantCourrierForm: React.FC<SubFormProps & IRequerantCourrierFormProps> = props => {
  return (
    <SousFormulaire titre={props.titre}>
      <div className="RequerantForm">
        {Requerant.estRaisonSociale(props.requerant) && (
          <InputField
            name={withNamespace(REQUERANT, RAISON_SOCIALE)}
            label={"Raison sociale"}
          />
        )}
        <InputField
          name={withNamespace(REQUERANT, NOM)}
          label={"Nom"}
        />
        <InputField
          name={withNamespace(REQUERANT, PRENOM)}
          label={"Prénom"}
        />
      </div>
    </SousFormulaire>
  );
};

export default connect(RequerantCourrierForm);
