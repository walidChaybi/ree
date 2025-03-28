/* istanbul ignore file */
/* v8 ignore start a faire Lundi 31 Mars @ Adrien_Bonvin */
import ChampDate from "../../../commun/champs/ChampDate";
import ChampTexte from "../../../commun/champs/ChampTexte";
import ChampsPrenoms from "../../../commun/champs/ChampsPrenoms";
import ChampsRadio from "../../../commun/champs/ChampsRadio";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import SeparateurSection from "../../../commun/conteneurs/formulaire/SeparateurSection";

const BlocTitulaire: React.FC = () => (
  <ConteneurAvecBordure titreEnTete="TITULAIRE">
    <div className="grid grid-cols-2 gap-4 pb-4 pt-2">
      <ChampTexte
        name="titulaire.nomActeEtranger"
        libelle="Nom sur l'acte étranger"
        estObligatoire
      />

      <ChampTexte
        name="titulaire.nomSouhaite"
        libelle="Nom souhaité sur l'acte français"
      />
    </div>

    <div className="grid gap-4">
      <ChampsPrenoms
        cheminPrenoms="titulaire.prenoms"
        prefixePrenom="prenom"
      />

      <ChampsRadio
        name="titulaire.sexe"
        libelle="Sexe"
        options={[
          { cle: "MASCULIN", libelle: "Masculin" },
          { cle: "FEMININ", libelle: "Féminin" }
        ]}
        estObligatoire
      />
    </div>

    <SeparateurSection titre="Naissance" />

    <div className="grid grid-cols-2 gap-4 pt-4">
      <ChampDate
        name="titulaire.naissance.date"
        libelle="Date de naissance"
        estObligatoire="année"
      />

      <ChampTexte
        name="titulaire.naissance.ville"
        libelle="Ville de naissance"
      />

      <ChampTexte
        name="titulaire.naissance.etatProvince"
        libelle="Région/état de naissance"
      />

      <ChampTexte
        name="titulaire.naissance.pays"
        libelle="Pays de naissance"
      />
    </div>
  </ConteneurAvecBordure>
);

export default BlocTitulaire;
/* v8 ignore end */
