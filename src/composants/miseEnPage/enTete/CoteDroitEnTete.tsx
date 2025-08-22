import { Droit } from "@model/agent/enum/Droit";
import React, { useContext } from "react";
import MenuUtilisateur from "../../../composants/miseEnPage/enTete/MenuUtilisateur";
import { RECEContextData } from "../../../contexts/RECEContextProvider";
import { BoutonRechercheRmc } from "./BoutonRechercheRmc";

const CoteDroitEnTete: React.FC = () => {
  const { utilisateurConnecte } = useContext(RECEContextData);

  return (
    <div className="flex h-16 justify-end">
      {utilisateurConnecte.estHabilitePour({ leDroit: Droit.CONSULTER }) && (
        <>
          <BoutonRechercheRmc />
          <div className="leading-[4rem]">
            <div className="inline-block h-10 w-px bg-bleu-sombre align-middle" />
          </div>
        </>
      )}

      <MenuUtilisateur />
    </div>
  );
};

export default CoteDroitEnTete;
