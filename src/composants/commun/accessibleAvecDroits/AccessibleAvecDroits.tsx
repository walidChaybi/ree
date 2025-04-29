import { RECEContextData } from "@core/contexts/RECEContext";
import { IHabilitation } from "@model/agent/Habilitation";
import { Droit } from "@model/agent/enum/Droit";
import React, { ReactElement, useContext, useMemo } from "react";

interface IAccessibleAvecDroitsProps {
  droits: Droit[];
  children: ReactElement;
}

export const extraireNomsDroits = (habilitations: IHabilitation[]): Droit[] =>
  habilitations?.flatMap(habilitation => habilitation.profil?.droits?.map(droit => droit.nom) || []);

const AccessibleAvecDroits: React.FC<IAccessibleAvecDroitsProps> = ({ droits, children }) => {
  const { utilisateurConnecte } = useContext(RECEContextData);

  const estAutorise = useMemo(() => {
    if (!utilisateurConnecte) return false;

    const droitsUtilisateur = extraireNomsDroits(utilisateurConnecte.habilitations);
    if (!droitsUtilisateur?.length) return false;

    return droits.some(droit => droitsUtilisateur.includes(droit));
  }, [utilisateurConnecte, droits]);

  return estAutorise ? children : <></>;
};

export default AccessibleAvecDroits;
