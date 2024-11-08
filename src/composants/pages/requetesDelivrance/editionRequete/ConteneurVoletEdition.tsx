import React from "react";

interface IConteneurVoletEditionProps {
  estActif: boolean;
}

const ConteneurVoletEdition: React.FC<
  React.PropsWithChildren<IConteneurVoletEditionProps>
> = ({ estActif, children }) => (
  <div className={`gap-2 py-4 ${estActif ? "grid" : "hidden"}`}>{children}</div>
);

export default ConteneurVoletEdition;
