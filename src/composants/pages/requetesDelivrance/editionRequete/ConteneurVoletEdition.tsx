import React from "react";

interface IConteneurVoletEditionProps {
  estActif: boolean;
}

const ConteneurVoletEdition: React.FC<
  React.PropsWithChildren<IConteneurVoletEditionProps>
> = ({ estActif, children }) => (
  <div
    className={`gap-2 pt-4 ${estActif ? "grid" : "hidden"} h-[44.6rem] overflow-hidden rounded-lg`}
  >
    {children}
  </div>
);

export default ConteneurVoletEdition;
