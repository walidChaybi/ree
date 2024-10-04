import { TUuidActeParams } from "@model/params/TUuidActeParams";
import { URL_CONTEXT_APP } from "@router/ReceUrls";
import { Navigate, useParams } from "react-router-dom";
import { PartieActeRequete } from "../../../composants/pages/requetesMiseAJour/PartieActeRequete";
import PartieFormulaire from "../../../composants/pages/requetesMiseAJour/PartieFormulaire";
import "./scss/PageApercuRequeteMiseAJourAnalyseMarginale.scss";

export const PageApercuRequeteMiseAJourAnalyseMarginale: React.FC = () => {
  const { idActeParam } = useParams<TUuidActeParams>();

  if (!idActeParam) {
    return <Navigate to={URL_CONTEXT_APP} replace />;
  }

  return (
    <div className="page-apercu-requete-mise-a-jour">
      <PartieActeRequete idActe={idActeParam} />
      <PartieFormulaire idActe={idActeParam} />
    </div>
  );
};
