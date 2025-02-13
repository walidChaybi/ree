import React from "react";
import ChampsZoneTexte from "../../../../commun/champs/ChampsZoneTexte";
import ConteneurAvecBordure from "../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

const BlocAutresEnonciations: React.FC = () => (
  <ConteneurAvecBordure>
      <ChampsZoneTexte
        name="autresEnonciations.enonciations"
        libelle="Texte énonciations"
        maxLength={2000}
        typeRedimensionnement="vertical"
      />
  </ConteneurAvecBordure>
);

export default BlocAutresEnonciations;
