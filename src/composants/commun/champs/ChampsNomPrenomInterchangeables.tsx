import CompareArrows from "@mui/icons-material/CompareArrows";
import { getIn, useFormikContext } from "formik";
import BoutonIcon from "../bouton/BoutonIcon";
import ChampTexte from "./ChampTexte";

export const ChampsNomPrenomInterchangeables: React.FC<{ cheminNom: string; cheminPrenom: string }> = ({ cheminNom, cheminPrenom }) => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext();

  const intervertir = () => {
    setFieldValue(cheminNom, getIn(values, cheminPrenom)).finally(() => setFieldTouched(cheminNom, true));
    setFieldValue(cheminPrenom, getIn(values, cheminNom)).finally(() => setFieldTouched(cheminPrenom, true));
  };

  return (
    <div className="grid grid-cols-2 gap-4 pt-4">
      <div className="flex gap-4">
        <ChampTexte
          name={cheminNom}
          libelle="Nom"
        />
        <BoutonIcon
          title="Intervertir Nom et Prénom"
          styleBouton="secondaire"
          className="mt-7 h-8 w-12"
          onClick={intervertir}
        >
          <CompareArrows />
        </BoutonIcon>
      </div>
      <ChampTexte
        name={cheminPrenom}
        libelle="Prénom"
      />
    </div>
  );
};
