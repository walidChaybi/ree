import { FormikProps, FormikValues } from "formik";
import OngletsContenu from "../../../commun/onglets/OngletsContenu";
import MiseAJourMentions from "../formulaires/mentions/MiseAJourMentions";

interface IMiseAJourMention {
  estActif: boolean;
  refFormulaire?: React.MutableRefObject<FormikProps<FormikValues> | null>;
}

const OngletMention: React.FC<IMiseAJourMention> = ({ estActif, refFormulaire }) => {
  return (
    <OngletsContenu estActif={estActif}>
      <MiseAJourMentions refFormulaire={refFormulaire} />
    </OngletsContenu>
  );
};

export default OngletMention;
