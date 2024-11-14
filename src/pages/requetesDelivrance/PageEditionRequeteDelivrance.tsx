import { TUuidActeParams } from "@model/params/TUuidActeParams";
import React from "react";
import { useParams } from "react-router-dom";
import EditionRequeteDelivrance from "../../composants/pages/requetesDelivrance/editionRequete/EditionRequeteDelivrance";
import BoutonsEditionRequeteDelivrance from "../../composants/pages/requetesDelivrance/editionRequete/boutons/BoutonsEditionRequeteDelivrance";
import EditionDelivranceContextProvider from "../../contexts/EditionDelivranceContextProvider";

export interface IDocumentsDelivrance {
  acte: string | null;
  principal: string | null;
  secondaire: string | null;
}

const PageEditionRequeteDelivrance: React.FC = () => {
  const { idRequeteParam, idActeParam } = useParams<TUuidActeParams>();

  return (
    <EditionDelivranceContextProvider
      idRequeteParam={idRequeteParam as string}
      idActeParam={idActeParam}
    >
      <div className="flex gap-12 pt-5">
        <EditionRequeteDelivrance />
        <BoutonsEditionRequeteDelivrance />
      </div>
    </EditionDelivranceContextProvider>
  );
};

export default PageEditionRequeteDelivrance;
