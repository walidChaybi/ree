/* v8 ignore start */
import { BlocMetaModele } from "@model/etatcivil/typesMention/MetaModeleTypeMention";
import React, { useCallback, useMemo, useState } from "react";

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
    <div
      key={bloc.typeBloc}
      className={`mt-4 rounded-xl border-2 border-solid border-bleu pb-2 text-start ${aucunEnfantAffiche ? "hidden" : ""}`}
    >
      <div className="-mt-3 pl-4">
        <span className="bg-white px-2 text-start text-bleu-sombre">{bloc.titre}</span>
      </div>
      <div className="mt-3 flex flex-wrap">{enfantsAvecGestionVisibilite}</div>
    </div>
  );
};
/* v8 ignore end */
