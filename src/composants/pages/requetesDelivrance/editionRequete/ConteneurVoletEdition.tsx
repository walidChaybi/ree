import React from "react";

interface IConteneurVoletEditionProps {
  estActif: boolean;
}

const ConteneurVoletEdition: React.FC<
  React.PropsWithChildren<IConteneurVoletEditionProps>
> = ({ estActif, children }) => (
  <div className={`volet-edition${estActif ? " volet-actif" : ""}`}>
    {children}
  </div>
);

export default ConteneurVoletEdition;
