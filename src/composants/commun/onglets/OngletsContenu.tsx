import React from "react";
import "./OngletsContenu.scss";

interface IOngletContenuProps {
  estActif: boolean;
}

const OngletsContenu: React.FC<
  React.PropsWithChildren<IOngletContenuProps>
> = ({ estActif, children }) => (
  <div className={`contenu-onglet${estActif ? " volet-actif" : ""}`}>
    {children}
  </div>
);

export default OngletsContenu;
