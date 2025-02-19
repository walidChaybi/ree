/* v8 ignore start */
import { BlocMetaModele } from "@model/etatcivil/typesMention/MetaModeleTypeMention";
import React, { useCallback, useMemo, useState } from "react";
import ConteneurAvecBordure from "../../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

export const ConteneurBlocFormulaireAideSaisie: React.FC<{
  bloc: BlocMetaModele;
  children: React.ReactNode;
}> = ({ bloc, children }) => {
  const [listeEnfantsAffiches, setListeEnfantsAffiches] = useState<Record<string, boolean>>({});

  const handleEstEnfantVisible = useCallback((cleEnfant: string, estVisible: boolean) => {
    setListeEnfantsAffiches(prev => ({ ...prev, [cleEnfant]: estVisible }));
  }, []);

  const enfantsAvecGestionVisibilite = React.Children.map(children, (child, i) => {
    const cleEnfant = (child as React.ReactElement).key ?? String(i);
    return React.cloneElement(child as React.ReactElement<any>, {
      setEstVisible: (estVisible: boolean) => handleEstEnfantVisible(cleEnfant, estVisible)
    });
  });

  let aucunEnfantAffiche = useMemo(() => Object.values(listeEnfantsAffiches).filter(Boolean).length === 0, [listeEnfantsAffiches]);

  return (
    <div {...(aucunEnfantAffiche ? { className: "hidden" } : {})}>
      <ConteneurAvecBordure
        titreEnTete={bloc.titre}
        sansMargeExterne
      >
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">{enfantsAvecGestionVisibilite}</div>
      </ConteneurAvecBordure>
    </div>
  );
};
/* v8 ignore end */
