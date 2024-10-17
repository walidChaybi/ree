import { TUuidActeParams } from "@model/params/TUuidActeParams";
import { URL_CONTEXT_APP } from "@router/ReceUrls";
import { Navigate, useParams } from "react-router-dom";
import { PartieActeRequete } from "../../composants/pages/requetesMiseAJour/PartieActeRequete";
import PartieFormulaire from "../../composants/pages/requetesMiseAJour/PartieFormulaire";
import EditionMiseAJourContextProvider from "../../contexts/EditionMiseAJourContextProvider";
import "./PageEditionRequeteMiseAJour.scss";

const PageEditionRequeteMiseAJour: React.FC = () => {
  const { idActeParam, idRequeteParam } = useParams<TUuidActeParams>();

  if (!idActeParam || !idRequeteParam) {
    return <Navigate to={URL_CONTEXT_APP} replace />;
  }

  return (
    <EditionMiseAJourContextProvider idActe={idActeParam} idRequete={idRequeteParam}>
      <div className="page-edition-requete-mise-a-jour">
        <PartieActeRequete />
        <PartieFormulaire />
      </div>
    </EditionMiseAJourContextProvider>
  );
};

export default PageEditionRequeteMiseAJour;
