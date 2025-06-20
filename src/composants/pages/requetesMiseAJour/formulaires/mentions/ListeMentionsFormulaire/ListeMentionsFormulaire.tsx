import { Form, Formik } from "formik";

import { IMentionMiseAJour, IMiseAJourMentionsForm } from "../../../PartieFormulaire";
import TableauMentions from "./TableauMentions";

interface IMentionsFormProps {
  setDonneesMentions: (data: IMentionMiseAJour[]) => void;
  setAfficherAnalyseMarginale: (afficher: boolean) => void;
  setMotif: (motif: string) => void;
}

const ListeMentionsFormulaire: React.FC<IMentionsFormProps> = ({ setDonneesMentions, setAfficherAnalyseMarginale, setMotif }) => {
  return (
    <Formik<IMiseAJourMentionsForm>
      initialValues={{ mentions: [] }}
      onSubmit={values => {
        setDonneesMentions(values.mentions);
      }}
    >
      {() => (
        <Form>
          <TableauMentions
            setAfficherOngletAnalyseMarginale={setAfficherAnalyseMarginale}
            setMotif={setMotif}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ListeMentionsFormulaire;
