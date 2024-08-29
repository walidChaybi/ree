import { TUuidActeParams } from "@model/params/TUuidActeParams";
import React from "react";
import { useParams } from "react-router-dom";
import PartieActeRequete from "../../composants/pages/requetesDelivrance/editionRequete/PartieActeRequete";
import PartieDocuments from "../../composants/pages/requetesDelivrance/editionRequete/PartieDocuments";
import EditionDelivranceContextProvider from "../../contexts/EditionDelivranceContextProvider";
import "./PageEditionRequeteDelivrance.scss";

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
      <div className="page-edition-requete-delivrance">
        <PartieActeRequete />
        <PartieDocuments />
      </div>
    </EditionDelivranceContextProvider>
  );
};

export default PageEditionRequeteDelivrance;
