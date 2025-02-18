import { Sexe } from "@model/etatcivil/enum/Sexe";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import React from "react";
import ChampDate from "../../../../commun/champs/ChampDate";
import ChampTexte from "../../../../commun/champs/ChampTexte";
import ChampsNomSecable from "../../../../commun/champs/ChampsNomSecable";
import ChampsPrenoms from "../../../../commun/champs/ChampsPrenoms";
import ChampsRadio from "../../../../commun/champs/ChampsRadio";
import ConteneurAvecBordure from "../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import SeparateurSection from "../../../../commun/conteneurs/formulaire/SeparateurSection";

interface IBlocTitulairetitulaireProps {
  titulaire?: ITitulaireRequeteCreation;
}

const BlocTitulaire: React.FC<IBlocTitulairetitulaireProps> = () => {
  return (
    <ConteneurAvecBordure>
      <div className="grid grid-cols-2 gap-4 text-start">
        <ChampTexte
          name="titulaire.nomNaissance"
          libelle="Nom sur l'acte étranger"
        />
        <div className="grid w-full gap-4 text-start">
          <ChampTexte
            name="titulaire.nomSouhaite"
            libelle="Nom souhaité"
            disabled
          />
        </div>
      </div>
      <div className="grid grid-cols-1 pt-4">
        <ChampsNomSecable
          nom={{ name: "titulaire.nomOEC", libelle: "Nom retenu par l'OEC" }}
          secable={{ name: "titulaire.secable", libelle: "Nom sécable" }}
          nomPartie1={{
            name: "nomSecable.nomPartie1",
            libelle: "Nom 1re partie"
          }}
          nomPartie2={{
            name: "nomSecable.nomPartie2",
            libelle: "Nom 2nde partie"
          }}
          estObligatoire
          afficherInfo={false}
        />
      </div>

      <div className="pt-4">
        <ChampsPrenoms
          cheminPrenoms="titulaire.prenomsChemin"
          prefixePrenom="prenom"
        />
      </div>
      <div className="grid w-full grid-cols-2 gap-4 pt-4 text-start">
        <ChampsRadio
          name="titulaire.sexe"
          libelle="Sexe"
          options={[
            { libelle: Sexe.MASCULIN.libelle, cle: Sexe.getKey(Sexe.MASCULIN) },
            { libelle: Sexe.FEMININ.libelle, cle: Sexe.getKey(Sexe.FEMININ) },
            { libelle: Sexe.INDETERMINE.libelle, cle: Sexe.getKey(Sexe.INDETERMINE) }
          ]}
        />
        <ChampDate
          name="titulaire.dateNaissance"
          libelle="Date de naissance"
          avecHeure
          className="flex"
          estObligatoire="année"
        />
      </div>

      <SeparateurSection titre="Lieu de naissance" />
      <div className="grid grid-cols-2 gap-4">
        <ChampTexte
          name="titulaire.villeNaissance"
          libelle="Ville"
          optionFormatage="PREMIER_MAJUSCULE"
        />
        <ChampTexte
          name="titulaire.regionNaissance"
          libelle="État, canton, province"
        />
        <ChampTexte
          name="titulaire.paysNaissance"
          libelle="Pays"
          optionFormatage="PREMIER_MAJUSCULE"
        />
        <ChampTexte
          name="titulaire.adresseNaissance"
          libelle="Adresse"
        />
      </div>
    </ConteneurAvecBordure>
  );
};

export default BlocTitulaire;
