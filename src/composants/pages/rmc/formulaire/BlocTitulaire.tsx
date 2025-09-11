import { ICriteresRMC } from "@model/rmc/commun/IRMCFormulaire";
import { useFormikContext } from "formik";
import ChampDate from "../../../commun/champs/ChampDate";
import ChampTexte from "../../../commun/champs/ChampTexte";
import { ChampsNomPrenomInterchangeables } from "../../../commun/champs/ChampsNomPrenomInterchangeables";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const BlocTitulaire: React.FC = () => {
  const { initialValues, setFieldValue } = useFormikContext<ICriteresRMC>();

  const reinitialiserValeurs = () => {
    setFieldValue("titulaire", structuredClone(initialValues.titulaire));
  };

  return (
    <ConteneurAvecBordure
      titreEnTete="Filtre titulaire"
      className="mt-8"
      reinitialiserDonneesBloc={reinitialiserValeurs}
    >
      <ChampsNomPrenomInterchangeables
        cheminNom="titulaire.nom"
        cheminPrenom="titulaire.prenom"
        avecAppauvrissement
      />
      <div className="grid grid-cols-2 gap-4 pt-4">
        <ChampDate
          name="titulaire.dateNaissance"
          libelle="Date de naissance"
          avecBoutonReinitialiser
        />
        <ChampTexte
          name="titulaire.paysNaissance"
          libelle="Pays de naissance"
        />
      </div>
    </ConteneurAvecBordure>
  );
};

export default BlocTitulaire;
