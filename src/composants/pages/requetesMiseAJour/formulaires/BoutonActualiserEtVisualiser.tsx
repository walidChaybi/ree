import { IMiseAJourAnalyseMarginaleValeursForm } from "@api/validations/requeteMiseAJour/MiseAJourAnalyseMarginaleValidation";
import { useFormikContext } from "formik";
import { useContext } from "react";
import { EditionMiseAJourContext } from "../../../../contexts/EditionMiseAJourContextProvider";
import Bouton from "../../../commun/bouton/Bouton";

const boutonInactif = (
  valeursInitiale: IMiseAJourAnalyseMarginaleValeursForm,
  valeurs: IMiseAJourAnalyseMarginaleValeursForm,
  miseAJourEffectuee: boolean
) => {
  switch (true) {
    case miseAJourEffectuee && valeursInitiale.analyseMarginale.motif !== valeurs.analyseMarginale.motif:
    case valeursInitiale.nomSecable.secable !== valeurs.nomSecable.secable:
    case valeursInitiale.analyseMarginale.nom.trim() !== valeurs.analyseMarginale.nom.trim():
    case valeursInitiale.nomSecable.nomPartie1.trim() !== valeurs.nomSecable.nomPartie1.trim():
    case valeursInitiale.nomSecable.nomPartie2.trim() !== valeurs.nomSecable.nomPartie2.trim():
      return false;
    default:
      break;
  }

  const prenomsDefaut = valeursInitiale.analyseMarginale.prenoms;
  const prenomsSaisis = valeurs.analyseMarginale.prenoms;
  if (Object.values(prenomsDefaut).filter(prenom => prenom).length !== Object.values(prenomsSaisis).filter(prenom => prenom).length) {
    return false;
  }

  return Object.keys(prenomsDefaut).reduce((nonModifie, clePrenom) => {
    if (!nonModifie) {
      return false;
    }

    return prenomsDefaut[clePrenom].trim() === prenomsSaisis[clePrenom].trim();
  }, true);
};

const BoutonActualiserEtVisualiser: React.FC = () => {
  const { miseAJourEffectuee } = useContext(EditionMiseAJourContext.Valeurs);
  const { initialValues, values } = useFormikContext<IMiseAJourAnalyseMarginaleValeursForm>();

  return (
    <Bouton title="Actualiser et visualiser" type="submit" disabled={boutonInactif(initialValues, values, miseAJourEffectuee)}>
      {"Actualiser et visualiser"}
    </Bouton>
  );
};

export default BoutonActualiserEtVisualiser;
