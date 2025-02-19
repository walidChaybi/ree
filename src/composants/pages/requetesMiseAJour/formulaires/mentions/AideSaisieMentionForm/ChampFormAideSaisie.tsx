/* v8 ignore start */
import { ETypeChamp } from "@model/etatcivil/typesMention/MetaModeleTypeMention";
import { Suspense, useMemo } from "react";

export const ChampFormAideSaisie: React.FC<React.PropsWithChildren<{ typeChamp: ETypeChamp }>> = ({ typeChamp, children }) => {
  const classesChamp = useMemo(() => {
    switch (typeChamp) {
      case "boolean":
        return "col-span-2 pt-2";
      case "radioBouton":
      case "sousTitre":
        return "col-span-2";
      default:
        return null;
    }
  }, [typeChamp]);

  return (
    <div {...(classesChamp ? { className: classesChamp } : {})}>
      <Suspense fallback={<></>}>{children}</Suspense>
    </div>
  );
};
/* v8 ignore end */
