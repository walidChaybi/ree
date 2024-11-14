import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useContext } from "react";
import { EditionDelivranceContext } from "../../../../../contexts/EditionDelivranceContextProvider";
import { ConteneurBoutonBasDePage } from "../../../../commun/bouton/conteneurBoutonBasDePage/ConteneurBoutonBasDePage";
import { BoutonModifierTraitement } from "./BoutonModifierTraitement";
import { BoutonsTerminerOuRelecture } from "./BoutonsTerminerOuRelecture";

const BoutonsEditionRequeteDelivrance: React.FC = () => {
  const { requete, acte } = useContext(EditionDelivranceContext);

  return (
    <>
      {requete.statutCourant.statut !== StatutRequete.TRANSMISE_A_VALIDEUR && (
        <ConteneurBoutonBasDePage position="gauche" afficherDegrade>
          <BoutonModifierTraitement requete={requete} />
        </ConteneurBoutonBasDePage>
      )}
      <ConteneurBoutonBasDePage position="droite">
        <BoutonsTerminerOuRelecture
          requete={requete}
          acte={acte ?? undefined}
        />
      </ConteneurBoutonBasDePage>
    </>
  );
};

export default BoutonsEditionRequeteDelivrance;
