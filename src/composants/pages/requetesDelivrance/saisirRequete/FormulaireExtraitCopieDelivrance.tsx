import { useState } from "react";
import ConteneurFormulaire from "../../../commun/conteneurs/formulaire/ConteneurFormulaire";
import BlocEvenement from "./BlocEvenement";
import BlocPiecesJustificatives from "./BlocPiecesJustificatives";
import BlocRequete from "./BlocRequete";
import BlocTitulaire from "./BlocTitulaire";
import BlocsRequerant from "./BlocsRequerant";

const FormulaireExtraitCopieDelivrance = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [evenementVisible, setEvenementVisible] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [titulaireDeuxVisible, setTitulaireDeuxVisible] =
    useState<boolean>(false);

  return (
    <ConteneurFormulaire titreEnTete="Délivrance Extrait/Copie courrier">
      <BlocRequete />
      {evenementVisible && <BlocEvenement />}
      <BlocTitulaire suffixe={titulaireDeuxVisible ? "1" : ""} />
      {titulaireDeuxVisible && <BlocTitulaire suffixe="2" />}
      <BlocsRequerant />
      <BlocPiecesJustificatives />
    </ConteneurFormulaire>
  );
};

export default FormulaireExtraitCopieDelivrance;
