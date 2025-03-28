import React from "react";
import ChampZoneTexte from "../../../../commun/champs/ChampZoneTexte";
import ConteneurAvecBordure from "../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const BlocAutresEnonciations: React.FC = () => (
  <ConteneurAvecBordure className="py-6">
    <ChampZoneTexte
      name="autresEnonciations.enonciations"
      libelle="Texte énonciations"
      maxLength={2000}
      typeRedimensionnement="vertical"
    />
  </ConteneurAvecBordure>
);

export default BlocAutresEnonciations;
