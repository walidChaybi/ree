import { RECEContextData } from "@core/contexts/RECEContext";
import { Droit } from "@model/agent/enum/Droit";
import React, { useContext, useMemo } from "react";

interface IProps {
  auMoinsUnDesDroits: Droit[];
  estDroitUnique?: boolean;
  droits?: Droit[];
}

const AccessibleAvecDroits: React.FC<React.PropsWithChildren<IProps>> = ({ droits, estDroitUnique, auMoinsUnDesDroits, children }) => {
  const { utilisateurConnecte } = useContext(RECEContextData);

  const estAutorise = useMemo(() => {
    const aAuMoinsUnDesDroits = utilisateurConnecte.estHabilitePour({ unDesDroits: auMoinsUnDesDroits });
    const aTousLesDroitsRequis = droits ? utilisateurConnecte.estHabilitePour({ tousLesDroits: droits }) : true;
    const aDroitUnique = estDroitUnique ? utilisateurConnecte.nombreHabilitations === 1 : true;

    return aAuMoinsUnDesDroits && aTousLesDroitsRequis && aDroitUnique;
  }, [utilisateurConnecte, droits, auMoinsUnDesDroits]);

  return <>{estAutorise && children}</>;
};

export default AccessibleAvecDroits;
