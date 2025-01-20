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
    <div className="noto-sans-ui px-4 py-8 text-bleu-sombre">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex w-full flex-col gap-4 text-start">
          <ChampsTexte
            name={"titulaire.nomEtranger"}
            libelle={"Nom sur l'acte étranger"}
            optionFormatage="PREMIER_MAJUSCULE"
          />

          <ChampsTexte
            name={"titulaire.nomOEC"}
            libelle={"Nom retenu par l'OEC"}
            optionFormatage="PREMIER_MAJUSCULE"
          />
        </div>

        <div className="flex w-full flex-col gap-4 text-start">
          <ChampsTexte
            name={"titulaire.nomSouhait"}
            libelle={"Nom souhaité"}
            optionFormatage="PREMIER_MAJUSCULE"
          />

          <ChampsRadio
            name={"titulaire.genre"}
            libelle={"Sexe"}
            options={[
              { libelle: Sexe.MASCULIN.libelle, cle: Sexe.MASCULIN.libelle },
              { libelle: Sexe.FEMININ.libelle, cle: Sexe.FEMININ.libelle },
              { libelle: Sexe.INDETERMINE.libelle, cle: Sexe.INDETERMINE.libelle }
            ]}
          />
        </div>

        <div>
          <ChampsNomSecable
            nom={{ name: "titulaire.nom", libelle: "Nom" }}
            secable={{ name: "titulaire.secable", libelle: "Nom sécable" }}
            nomPartie1={{
              name: "nomSecable.nomPartie1",
              libelle: "Nom 1re partie"
            }}
            nomPartie2={{
              name: "nomSecable.nomPartie2",
              libelle: "Nom 2nde partie"
            }}
          />
        </div>

        <div>
          <ChampsPrenoms
            cheminPrenoms={"titulaire.cheminPrenoms"}
            prefixePrenom={"prenom"}
          />

          <ChampDate
            name={"titulaire.dateNaissance"}
            libelle={"Date de naissance"}
            avecHeure={true}
            className="flex pt-4"
          />
        </div>
      </div>
      <div className="mb-5 mt-1 mt-8 flex w-full border-0 border-b-2 border-solid border-bleu text-start">
        <h3 className="-mb-3 ml-6 bg-blanc px-1.5 text-bleu-sombre">{"Lieu de naissance"}</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ChampsTexte
          name={"titulaire.villeNaissance"}
          libelle={"Ville"}
          optionFormatage="PREMIER_MAJUSCULE"
        />
        <ChampsTexte
          name={"titulaire.regionNaissance"}
          libelle={"Etat, canton, province"}
          optionFormatage="PREMIER_MAJUSCULE"
        />
        <ChampsTexte
          name={"titulaire.paysNaissance"}
          libelle={"Pays"}
          optionFormatage="PREMIER_MAJUSCULE"
        />
        <ChampsTexte
          name={"titulaire.adresseNaissance"}
          libelle={"Adresse"}
        />
      </div>
    </div>
  );
};

export default BlocTitulaire;
