/* v8 ignore start */
import { BlocMetaModele } from "@model/etatcivil/typesMention/MetaModeleTypeMention";
import React, { useMemo, useState } from "react";
import ConteneurAvecBordure from "../../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";

export const ConteneurBlocFormulaireAideSaisie: React.FC<{
  bloc: BlocMetaModele;
  children: React.ReactNode;
}> = ({ bloc, children }) => {
  const [childrenAffiches, setChildrenAffiches] = useState<Record<string, boolean>>({});
  const aucunChildAffiche = useMemo(() => !Object.values(childrenAffiches).filter(Boolean).length, [childrenAffiches]);

  return (
    <div {...(aucunChildAffiche ? { className: "hidden" } : {})}>
      <ConteneurAvecBordure
        titreEnTete={bloc.titre}
        sansMargeHorizontale
      >
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 pb-4 pt-2">
          {React.Children.map(children, (child, index) => {
            const composantChild = child as React.ReactElement<{ setEstVisible: (estVisible: boolean) => void }>;

            return React.cloneElement(composantChild, {
              setEstVisible: (estVisible: boolean) =>
                setChildrenAffiches(prec => ({ ...prec, [composantChild.key ?? String(index)]: estVisible }))
            });
          })}
        </div>
      </ConteneurAvecBordure>
    </div>
  );
};
/* v8 ignore end */
