import React from "react";

interface IConteneurVoletEditionProps {
  estActif: boolean;
  estScrollable?: boolean;
  estSousOnglet?: boolean;
  sansMargeHaute?: boolean;
}

const classesConteneur = (estActif: boolean, estScrollable?: boolean, estSousOnglet?: boolean, sansMargeHaute?: boolean) => {
  const classesHauteur = (() => {
    switch (true) {
      case sansMargeHaute && estSousOnglet:
        return ["h-[calc(100vh-19.5rem)]"];
      case sansMargeHaute && !estSousOnglet:
        return ["h-[calc(100vh-15.5rem)]"];
      case !sansMargeHaute && estSousOnglet:
        return ["pt-4", "h-[calc(100vh-20.5rem)]"];
      case !sansMargeHaute && !estSousOnglet:
        return ["pt-4", "h-[calc(100vh-16.5rem)]"];
      default:
        return [];
    }
  })();

  return ["gap-2", "rounded-lg", estActif ? "grid" : "hidden", estScrollable ? "overflow-auto" : "overflow-hidden", ...classesHauteur].join(
    " "
  );
};

const ConteneurVoletEdition: React.FC<React.PropsWithChildren<IConteneurVoletEditionProps>> = ({
  estActif,
  estScrollable,
  estSousOnglet,
  sansMargeHaute,
  children
}) => <div className={classesConteneur(estActif, estScrollable, estSousOnglet, sansMargeHaute)}>{children}</div>;

export default ConteneurVoletEdition;
