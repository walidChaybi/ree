import { EPrepositionLieu } from "@model/etatcivil/enum/EPrepositionLieu";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { enumVersOptions } from "@util/Utils";
import React from "react";
import ChampDate from "../../../../commun/champs/ChampDate";
import ChampListeDeroulante from "../../../../commun/champs/ChampListeDeroulante";
import ChampTexte from "../../../../commun/champs/ChampTexte";
import ChampsNomSecable from "../../../../commun/champs/ChampsNomSecable";
import ChampsPrenoms from "../../../../commun/champs/ChampsPrenoms";
import ChampsRadio from "../../../../commun/champs/ChampsRadio";
import ConteneurAvecBordure from "../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import SeparateurSection from "../../../../commun/conteneurs/formulaire/SeparateurSection";

interface IBlocTitulairetitulaireProps {
  titulaire?: ITitulaireRequeteCreation;
}

const optionsPreposition = enumVersOptions(EPrepositionLieu);

const BlocTitulaire: React.FC<IBlocTitulairetitulaireProps> = () => {
  return (
    <ConteneurAvecBordure className="py-6">
      <div className="grid grid-cols-2 gap-4 text-start">
        <ChampTexte
          name="titulaire.nomActeEtranger"
          libelle="Nom sur l'acte étranger"
          estObligatoire
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
          nom={{ name: "titulaire.nomRetenuOEC", libelle: "Nom retenu par l'OEC" }}
          secable={{ name: "titulaire.nomSecable.secable", libelle: "Nom sécable" }}
          nomPartie1={{
            name: "titulaire.nomSecable.nomPartie1",
            libelle: "Nom 1re partie"
          }}
          nomPartie2={{
            name: "titulaire.nomSecable.nomPartie2",
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
            { libelle: Sexe.FEMININ.libelle, cle: Sexe.getKey(Sexe.FEMININ) }
          ]}
        />
        <ChampDate
          name="titulaire.dateNaissance"
          libelle="Date de naissance"
          avecHeure
          estObligatoire="année"
        />
      </div>

      <SeparateurSection titre="Lieu de naissance" />

      <div className="grid grid-cols-[100px_1fr_1fr] gap-4 pt-4">
        <ChampListeDeroulante
          name="titulaire.lieuNaissance.preposition"
          libelle="Préposition"
          options={optionsPreposition}
        />
        <ChampTexte
          name="titulaire.lieuNaissance.ville"
          libelle="Ville"
          optionFormatage="PREMIER_MAJUSCULE"
        />
        <ChampTexte
          name="titulaire.lieuNaissance.region"
          libelle="État, canton, province"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4">
        <ChampTexte
          name="titulaire.lieuNaissance.pays"
          libelle="Pays"
          optionFormatage="PREMIER_MAJUSCULE"
        />
        <ChampTexte
          name="titulaire.lieuNaissance.adresse"
          libelle="Adresse"
        />
      </div>
    </ConteneurAvecBordure>
  );
};

export default BlocTitulaire;
