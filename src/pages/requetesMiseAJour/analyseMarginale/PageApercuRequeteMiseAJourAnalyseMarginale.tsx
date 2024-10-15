import { TUuidActeParams } from "@model/params/TUuidActeParams";
import { URL_CONTEXT_APP } from "@router/ReceUrls";
import { Navigate, useParams } from "react-router-dom";
import { PartieActeRequete } from "../../../composants/pages/requetesMiseAJour/PartieActeRequete";
import PartieFormulaire from "../../../composants/pages/requetesMiseAJour/PartieFormulaire";
import EditionMiseAJourContextProvider from "../../../contexts/EditionMiseAJourContextProvider";
import "./scss/PageApercuRequeteMiseAJourAnalyseMarginale.scss";

export const PageApercuRequeteMiseAJourAnalyseMarginale: React.FC = () => {
  const { idActeParam, idRequeteParam } = useParams<TUuidActeParams>();

  if (!idActeParam || !idRequeteParam) {
    return <Navigate to={URL_CONTEXT_APP} replace />;
  }

  return (
    <EditionMiseAJourContextProvider
      idActe={idActeParam}
      idRequete={idRequeteParam}
    >
      <div className="page-apercu-requete-mise-a-jour">
        <PartieActeRequete />
        <PartieFormulaire />
      </div>
    </EditionMiseAJourContextProvider>
  );
};
