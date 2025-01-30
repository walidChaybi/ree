import { Sexe } from "@model/etatcivil/enum/Sexe";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import React from "react";
import ChampDate from "../../../../commun/champs/ChampDate";
import ChampsNomSecable from "../../../../commun/champs/ChampsNomSecable";
import ChampsPrenoms from "../../../../commun/champs/ChampsPrenoms";
import ChampsRadio from "../../../../commun/champs/ChampsRadio";
import ChampsTexte from "../../../../commun/champs/ChampsTexte";

interface IBlocTitulairetitulaireProps {
  titulaire?: ITitulaireRequeteCreation;
}

const BlocTitulaire: React.FC<IBlocTitulairetitulaireProps> = () => {
  return (
    <div className="m-4 mb-10 mt-8 rounded-md border border-solid border-blue-200 bg-white p-4 px-4 py-8 font-noto-sans-ui text-bleu-sombre shadow-md">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex w-full flex-col gap-4 text-start">
          <ChampsTexte
            name="titulaire.nomNaissance"
            libelle="Nom sur l'acte étranger"
            optionFormatage="NOMS_PROPRES"
          />

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

        <div className="flex w-full flex-col gap-4 text-start">
          <ChampsTexte
            name="titulaire.nomSouhaite"
            libelle="Nom souhaité"
            optionFormatage="PREMIER_MAJUSCULE"
            disabled
          />
          <ChampsPrenoms
            cheminPrenoms="titulaire.prenomsChemin"
            prefixePrenom="prenom"
          />
        </div>

        <div className="flex w-full flex-col gap-4 text-start">
          <ChampsRadio
            name="titulaire.sexe"
            libelle="Sexe"
            options={[
              { libelle: Sexe.MASCULIN.libelle, cle: Sexe.getKey(Sexe.MASCULIN) },
              { libelle: Sexe.FEMININ.libelle, cle: Sexe.getKey(Sexe.FEMININ) },
              { libelle: Sexe.INDETERMINE.libelle, cle: Sexe.getKey(Sexe.INDETERMINE) }
            ]}
          />
        </div>

        <div>
          <ChampDate
            name="titulaire.dateNaissance"
            libelle="Date de naissance"
            avecHeure
            className="flex"
            estObligatoire="année"
          />
        </div>
      </div>
      <div className="mb-5 mt-8 flex w-full border-0 border-b-2 border-solid border-bleu text-start">
        <h3 className="-mb-3 ml-6 bg-blanc px-1.5 text-bleu-sombre">{"Lieu de naissance"}</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ChampsTexte
          name="titulaire.villeNaissance"
          libelle="Ville"
          optionFormatage="NOMS_PROPRES"
        />
        <ChampsTexte
          name="titulaire.regionNaissance"
          libelle="État, canton, province"
          optionFormatage="PREMIER_MAJUSCULE"
        />
        <ChampsTexte
          name="titulaire.paysNaissance"
          libelle="Pays"
          optionFormatage="NOMS_PROPRES"
        />
        <ChampsTexte
          name="titulaire.adresseNaissance"
          libelle="Adresse"
        />
      </div>
    </div>
  );
};

export default BlocTitulaire;
