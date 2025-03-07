import { connect } from "formik";
import ChampTexte from "./ChampTexte";

interface ChampsCoordonneeProps {
  nom: string;
  formulaireReduit?: boolean;
}

const ChampsCoordonnees: React.FC<ChampsCoordonneeProps> = ({ nom, formulaireReduit }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ChampTexte
        name={`${nom}.complementDestinataire`}
        libelle="Complément d'identification du destinataire"
      />
      <ChampTexte
        name={`${nom}.complementPointGeo`}
        libelle="Complément d'identification du point géographique"
      />
      <ChampTexte
        name={`${nom}.voie`}
        libelle="Numéro, type et nom de la voie"
      />
      <ChampTexte
        name={`${nom}.lieuDit`}
        libelle="Lieu-dit, boite postale ou état/province (à l'étranger)"
      />
      <ChampTexte
        name={`${nom}.pays`}
        libelle="Pays"
      />
      <ChampTexte
        name={`${nom}.codePostal`}
        libelle="Code postal"
      />
      <ChampTexte
        name={`${nom}.commune`}
        libelle="Commune"
      />
      {!formulaireReduit && (
        <ChampTexte
          name={`${nom}.adresseCourriel`}
          libelle="Adresse courriel du requérant"
        />
      )}
      <ChampTexte
        name={`${nom}.autreAdresseCourriel`}
        libelle="Autre adresse courriel"
      />
      {!formulaireReduit && (
        <ChampTexte
          name={`${nom}.numeroTelephone`}
          libelle="Numéro téléphone du requérant"
        />
      )}
      <ChampTexte
        name={`${nom}.autreNumeroTelephone`}
        libelle="Autre numéro de téléphone"
      />
    </div>
  );
};

export default connect(ChampsCoordonnees);
