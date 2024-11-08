import { Courrier } from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/Courrier";
import { useContext } from "react";
import { EditionDelivranceContext } from "../../../../../contexts/EditionDelivranceContextProvider";
import ConteneurFormulaire from "../../../../commun/conteneurs/formulaire/ConteneurFormulaire";

const VoletCourrier = () => {
  const { requete, acte } = useContext(EditionDelivranceContext);

  return (
    <>
      <ConteneurFormulaire titreEnTete={"Modifier courrier"}>
        <div>courrier</div>
      </ConteneurFormulaire>
      <Courrier requete={requete} idActe={acte?.id} natureActe={acte?.nature} />
    </>
  );
};

export default VoletCourrier;
