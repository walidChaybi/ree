import { TUuidActeParams } from "@model/params/TUuidActeParams";
import React from "react";
import { useParams } from "react-router-dom";
import PartieActeRequete from "../../composants/pages/requetesDelivrance/editionRequete/PartieActeRequete";
import PartieDocuments from "../../composants/pages/requetesDelivrance/editionRequete/PartieDocuments";
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
      <div className="flex gap-12 py-8">
        <PartieActeRequete />
        <PartieDocuments />
      </div>
    </EditionDelivranceContextProvider>
  );
};

export default PageEditionRequeteDelivrance;
