/* v8 ignore start */
import { ETypeChamp } from "@model/etatcivil/typesMention/MetaModeleTypeMention";
import { Suspense } from "react";

const getClassesChamp = (typeChamp: ETypeChamp) => {
  switch (typeChamp) {
    case "text":
    case "select":
    case "dateComplete":
    case "dateIncomplete":
    case "annee":
    case "int":
    case "pocopa":
      return "w-[42.5%] px-[2.5%] pb-4";
    case "boolean":
      return "w-full px-[2.5%] pb-6 pt-4 text-left";
    case "radioBouton":
      return "w-full px-[2.5%] pb-6 pt-2 text-left";
    case "sousTitre":
      return "mb-4 mt-3 mx-4 flex w-full border-0 border-b-2 border-solid border-bleu text-start";
    default:
      return "";
  }
};

export const ChampFormAideSaisie: React.FC<React.PropsWithChildren<{ typeChamp: ETypeChamp }>> = ({ typeChamp, children }) => {
  return (
    <div className={getClassesChamp(typeChamp)}>
      <Suspense fallback={<></>}>{children}</Suspense>
    </div>
  );
};
/* v8 ignore end */
