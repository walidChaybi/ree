import { courrierExiste } from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/CourrierFonctions";
import { useContext } from "react";
import { EditionDelivranceContext } from "../../../../../../contexts/EditionDelivranceContextProvider";
import ConteneurFormulaire from "../../../../../commun/conteneurs/formulaire/ConteneurFormulaire";
import { Courrier } from "./Courrier";

const VoletCourrier = () => {
  const { requete, acte } = useContext(EditionDelivranceContext);

  return (
    <ConteneurFormulaire
      titreEnTete={
        courrierExiste(requete)
          ? "Modification du courrier"
          : "Création du courrier"
      }
    >
      <Courrier
        requete={requete}
        idActe={acte?.id}
        natureActe={acte?.nature}
        estNouvelEcranCourrier
      />
    </ConteneurFormulaire>
  );
};

export default VoletCourrier;
