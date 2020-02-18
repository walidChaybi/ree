import React from "react";
import { RequeteTableau } from "./RequeteTableau";
import { Text } from "../../common/widget/Text";

export const MesRequetesPage: React.FC = () => {
  return (
    <>
      <h2>
        <Text messageId={"pages.requetes.enCours.titre"} />
      </h2>
      <RequeteTableau />
    </>
  );
};
