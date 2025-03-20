/* v8 ignore start A TESTER 03/25 */
import React from "react";
import ChampTexte from "../../../commun/champs/ChampTexte";
import ConteneurAvecBordure from "../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import SeparateurSection from "../../../commun/conteneurs/formulaire/SeparateurSection";

const BlocRequerant: React.FC = () => (
  <ConteneurAvecBordure titreEnTete="REQUÉRANT">
    <div className="grid gap-4 pt-4">
      <div className="grid grid-cols-2 gap-4">
        <ChampTexte
          name="requerant.nom"
          libelle="Nom"
        />

        <ChampTexte
          name="requerant.nomUsage"
          libelle="Nom d'usage"
        />

        <ChampTexte
          name="requerant.prenom"
          libelle="Prénom"
        />
      </div>

      <SeparateurSection titre="Adresse" />

      <div className="grid grid-cols-2 gap-4">
        <ChampTexte
          name="requerant.adresse.complementDestinataire"
          libelle="Complément d'identification du destinataire"
          maxLength={38}
        />

        <ChampTexte
          name="requerant.adresse.complementPointGeo"
          libelle="Complément d'identification du point géographique"
          maxLength={38}
        />

        <ChampTexte
          name="requerant.adresse.voie"
          libelle="Numéro, type et nom de la voie"
          maxLength={38}
        />

        <ChampTexte
          name="requerant.adresse.lieuDit"
          libelle="Lieu-dit, boite postale ou état/province (à l'étranger)"
          maxLength={38}
        />

        <ChampTexte
          name="requerant.adresse.codePostal"
          libelle="Code postal"
          maxLength={38}
        />

        <ChampTexte
          name="requerant.adresse.commune"
          libelle="Commune"
          maxLength={38}
        />

        <ChampTexte
          name="requerant.adresse.pays"
          libelle="Pays"
          maxLength={38}
        />
      </div>

      <SeparateurSection titre="Contacts" />

      <div className="grid grid-cols-2 gap-4">
        <ChampTexte
          name="requerant.adresse.adresseCourriel"
          libelle="Adresse courriel"
        />

        <ChampTexte
          name="requerant.autreAdresseCourriel"
          libelle="Autre adresse courriel"
        />

        <ChampTexte
          name="requerant.adresse.numeroTelephone"
          libelle="Numéro de téléphone"
        />

        <ChampTexte
          name="requerant.autreNumeroTelephone"
          libelle="Autre numéro de téléphone"
        />
      </div>
    </div>
  </ConteneurAvecBordure>
);

export default BlocRequerant;
/* v8 ignore end */
