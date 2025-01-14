import React from "react";
import ConteneurSousFormulaire from "../../../../commun/conteneurs/sousFormulaire/ConteneurSousFormulaire";

interface IBlocTitulaireProps {
  suffixe?: string;
}

const BlocTitulaire: React.FC<IBlocTitulaireProps> = () => {
  return <ConteneurSousFormulaire>Bloc Titulaires</ConteneurSousFormulaire>;
};

export default BlocTitulaire;
