import { ISaisieRDCForm } from "@model/form/delivrance/ISaisieRDCForm";
import { useFormikContext } from "formik";
import ChampDate from "../../../commun/champs/ChampDate";
import ChampTexte from "../../../commun/champs/ChampTexte";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const BlocEvenement: React.FC = () => {
  const { values } = useFormikContext<ISaisieRDCForm>();

  return values.requete.natureActe !== "NAISSANCE" ? (
    <ConteneurAvecBordure titreEnTete="ÉVÈNEMENT">
      <div className="grid grid-cols-2 gap-2 pt-2">
        <ChampDate
          name="evenement.date"
          libelle="Date de l'évènement"
        />

        <ChampTexte
          name="evenement.ville"
          libelle="Ville de l'évènement"
          maxLength={100}
        />

        <ChampTexte
          name="evenement.pays"
          libelle="Pays de l'évènement"
          maxLength={100}
        />
      </div>
    </ConteneurAvecBordure>
  ) : (
    <></>
  );
};

export default BlocEvenement;
