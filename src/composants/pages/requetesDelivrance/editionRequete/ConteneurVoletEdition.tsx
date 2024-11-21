import React from "react";

interface IConteneurVoletEditionProps {
  estActif: boolean;
  estScrollable?: boolean;
  estSousOnglet?: boolean;
}

const ConteneurVoletEdition: React.FC<React.PropsWithChildren<IConteneurVoletEditionProps>> = ({
  estActif,
  estScrollable,
  estSousOnglet,
  children
}) => (
  <div
    className={`gap-2 pt-4 ${estActif ? "grid" : "hidden"} ${estSousOnglet ? "h-[calc(100vh-20.5rem)]" : "h-[calc(100vh-16.5rem)]"} ${estScrollable ? "overflow-auto" : "overflow-hidden"} rounded-lg`}
  >
    {children}
  </div>
);

export default ConteneurVoletEdition;
