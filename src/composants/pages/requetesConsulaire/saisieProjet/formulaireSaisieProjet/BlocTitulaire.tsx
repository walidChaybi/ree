import { EPrepositionLieu } from "@model/etatcivil/enum/EPrepositionLieu";
import { ESexe } from "@model/etatcivil/enum/Sexe";
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

const optionsPreposition = enumVersOptions(EPrepositionLieu);

const BlocTitulaire: React.FC<{ indexTitulaire: number }> = ({ indexTitulaire }) => {
  return (
    <ConteneurAvecBordure className="py-6">
      <div className="grid w-full gap-4 text-start">
        <ChampsNomSecable
          nom={{ name: `titulaires.${indexTitulaire}.nomActeEtranger`, libelle: "Nom sur l'acte étranger" }}
          secable={{ name: `titulaires.${indexTitulaire}.nomSecable.secable`, libelle: "Nom sécable" }}
          nomPartie1={{
            name: `titulaires.${indexTitulaire}.nomSecable.nomPartie1`,
            libelle: "Nom 1re partie"
          }}
          nomPartie2={{
            name: `titulaires.${indexTitulaire}.nomSecable.nomPartie2`,
            libelle: "Nom 2nde partie"
          }}
          estObligatoire
          afficherInfo={false}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 pt-4 text-start">
        <ChampTexte
          name={`titulaires.${indexTitulaire}.nomSouhaite`}
          libelle="Nom souhaité"
          disabled
        />
        <ChampTexte
          name={`titulaires.${indexTitulaire}.nomRetenuOEC`}
          libelle="Nom retenu par l'OEC"
          estObligatoire
        />
      </div>

      <div className="pt-4">
        <ChampsPrenoms
          cheminPrenoms={`titulaires.${indexTitulaire}.prenomsChemin`}
          prefixePrenom="prenom"
        />
      </div>
      <div className="grid w-full grid-cols-2 gap-4 pt-4 text-start">
        <ChampsRadio
          name={`titulaires.${indexTitulaire}.sexe`}
          libelle="Sexe"
          options={enumVersOptions(ESexe, { clesAExclure: ["INDETERMINE", "INCONNU"] })}
        />
        <ChampDate
          name={`titulaires.${indexTitulaire}.dateNaissance`}
          libelle="Date de naissance"
          avecHeure
          estObligatoire="année"
        />
      </div>

      <SeparateurSection titre="Lieu de naissance" />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex gap-4">
          <ChampListeDeroulante
            name={`titulaires.${indexTitulaire}.lieuNaissance.preposition`}
            libelle="Préposition"
            options={optionsPreposition}
          />
          <ChampTexte
            name={`titulaires.${indexTitulaire}.lieuNaissance.ville`}
            libelle="Ville"
            optionFormatage="PREMIER_MAJUSCULE"
          />
        </div>
        <ChampTexte
          name={`titulaires.${indexTitulaire}.lieuNaissance.region`}
          libelle="État, canton, province"
        />
        <ChampTexte
          name={`titulaires.${indexTitulaire}.lieuNaissance.pays`}
          libelle="Pays"
          optionFormatage="PREMIER_MAJUSCULE"
        />
        <ChampTexte
          name={`titulaires.${indexTitulaire}.lieuNaissance.adresse`}
          libelle="Adresse"
        />
      </div>
    </ConteneurAvecBordure>
  );
};

export default BlocTitulaire;
