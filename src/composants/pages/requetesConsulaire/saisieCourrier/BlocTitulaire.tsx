/* v8 ignore start A TESTER 03/25 */

import { ESexe } from "@model/etatcivil/enum/Sexe";
import { enumVersOptions } from "@util/Utils";
import ChampDate from "../../../commun/champs/ChampDate";
import ChampTexte from "../../../commun/champs/ChampTexte";
import ChampsPrenoms from "../../../commun/champs/ChampsPrenoms";
import ChampsRadio from "../../../commun/champs/ChampsRadio";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import SeparateurSection from "../../../commun/conteneurs/formulaire/SeparateurSection";
import { IBlocTitulaireProps } from "../../requetesDelivrance/saisirRequete/BlocTitulaires";

const BlocTitulaire: React.FC<IBlocTitulaireProps> = ({ indexTitulaire, unSeulTitulaire }) => (
  <ConteneurAvecBordure
    titreEnTete={unSeulTitulaire ? "TITULAIRE" : `Titulaire ${indexTitulaire + 1}`}
    key={`titulaire-${indexTitulaire}`}
  >
    <div className="grid grid-cols-2 gap-4 pb-4 pt-2">
      <ChampTexte
        name={`titulaires[${indexTitulaire}].nomActeEtranger`}
        libelle="Nom sur l'acte étranger"
        estObligatoire
      />

      <ChampTexte
        name={`titulaires[${indexTitulaire}].nomSouhaite`}
        libelle="Nom souhaité sur l'acte français"
      />
    </div>

    <div className="grid gap-4">
      <ChampsPrenoms
        cheminPrenoms={`titulaires[${indexTitulaire}].prenoms`}
        prefixePrenom="prenom"
      />

      <ChampsRadio
        name={`titulaires[${indexTitulaire}].sexe`}
        libelle="Sexe"
        options={enumVersOptions(ESexe, { clesAExclure: ["INDETERMINE", "INCONNU"] })}
        estObligatoire
      />
    </div>

    <SeparateurSection titre="Naissance" />

    <div className="grid grid-cols-2 gap-4 pt-4">
      <ChampDate
        name={`titulaires[${indexTitulaire}].naissance.date`}
        libelle="Date de naissance"
        estObligatoire="année"
      />

      <ChampTexte
        name={`titulaires[${indexTitulaire}].naissance.ville`}
        libelle="Ville de naissance"
      />

      <ChampTexte
        name={`titulaires[${indexTitulaire}].naissance.etatProvince`}
        libelle="Région/état de naissance"
      />

      <ChampTexte
        name={`titulaires[${indexTitulaire}].naissance.pays`}
        libelle="Pays de naissance"
      />
    </div>
  </ConteneurAvecBordure>
);

const BlocTitulaires: React.FC<{ nombreDeTitulaires: number }> = ({ nombreDeTitulaires }) => {
  return (
    <>
      {nombreDeTitulaires === 1 ? (
        <BlocTitulaire
          indexTitulaire={0}
          unSeulTitulaire={true}
        />
      ) : (
        <ConteneurAvecBordure titreEnTete="TITULAIRES">
          {[...Array(nombreDeTitulaires).keys()].map(indexTitulaire => (
            <div
              className="pt-6"
              key={`titulaire-${indexTitulaire}`}
            >
              <BlocTitulaire
                indexTitulaire={0}
                unSeulTitulaire={false}
              />
            </div>
          ))}
        </ConteneurAvecBordure>
      )}
    </>
  );
};

export default BlocTitulaires;
/* v8 ignore end */
