import React from "react";
import { RequeteTableau } from "./RequeteTableau";
import { Title } from "../../core/title/Title";

export const MesRequetesPage: React.FC = () => {
  return (
    <>
      <Title titleId={"pages.requetes.enCours.titre"} />
      <RequeteTableau />
    </>
  );
};
