import ChampDate from "../../../commun/champs/ChampDate";
import ChampTexte from "../../../commun/champs/ChampTexte";
import { ChampsNomPrenomInterchangeables } from "../../../commun/champs/ChampsNomPrenomInterchangeables";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const BlocTitulaireRMC: React.FC = () => {
  return (
    <ConteneurAvecBordure
      titreEnTete="Filtre titulaire"
      className="mt-8"
    >
      <ChampsNomPrenomInterchangeables
        cheminNom="titulaire.nom"
        cheminPrenom="titulaire.prenom"
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

export default BlocTitulaireRMC;
