import { RECEContextData } from "@core/contexts/RECEContext";
import { TUuidActeParams } from "@model/params/TUuidActeParams";
import React, { useContext } from "react";
import { useParams } from "react-router";
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
  const { utilisateurs } = useContext(RECEContextData);

  return utilisateurs.length ? (
    <EditionDelivranceContextProvider
      idRequeteParam={idRequeteParam as string}
      idActeParam={idActeParam}
    >
      <div className="flex gap-12 pt-4">
        <EditionRequeteDelivrance />
        <BoutonsEditionRequeteDelivrance />
      </div>
    </EditionDelivranceContextProvider>
  ) : (
    <></>
  );
};

export default PageEditionRequeteDelivrance;
