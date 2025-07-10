import { RECEContextData } from "@core/contexts/RECEContext";
import { Droit } from "@model/agent/enum/Droit";
import React, { useContext, useMemo } from "react";

interface IProps {
  auMoinsUnDesDroits: Droit[];
  droits?: Droit[];
}

const AccessibleAvecDroits: React.FC<React.PropsWithChildren<IProps>> = ({ droits, auMoinsUnDesDroits, children }) => {
  const { utilisateurConnecte } = useContext(RECEContextData);

  const estAutorise = useMemo(() => {
    const aAuMoinsUnDesDroits = utilisateurConnecte.estHabilitePour({ unDesDroits: auMoinsUnDesDroits });
    const aTousLesDroitsRequis = droits ? utilisateurConnecte.estHabilitePour({ tousLesDroits: droits }) : true;

    return aAuMoinsUnDesDroits && aTousLesDroitsRequis;
  }, [utilisateurConnecte, droits, auMoinsUnDesDroits]);

  return <>{estAutorise && children}</>;
};

export default AccessibleAvecDroits;
