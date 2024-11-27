import { TUuidActeParams } from "@model/params/TUuidActeParams";
import { URL_CONTEXT_APP } from "@router/ReceUrls";
import { Navigate, useLocation, useParams } from "react-router-dom";
import MiseAJourRequete from "../../composants/pages/requetesMiseAJour/MiseAJourRequete";
import EditionMiseAJourContextProvider from "../../contexts/EditionMiseAJourContextProvider";

const PageEditionRequeteMiseAJour: React.FC = () => {
  const { idActeParam, idRequeteParam } = useParams<TUuidActeParams>();

  const location = useLocation();
  const ULR_MISE_A_JOUR_SANS_MENTIONS = "requete-mise-a-jour-analyse-marginale";

  if (!idActeParam || !idRequeteParam) {
    return (
      <Navigate
        to={URL_CONTEXT_APP}
        replace
      />
    );
  }
  return (
    <EditionMiseAJourContextProvider
      idActe={idActeParam}
      idRequete={idRequeteParam}
      estMiseAJourAvecMentions={!location.pathname.includes(ULR_MISE_A_JOUR_SANS_MENTIONS)}
    >
      <MiseAJourRequete />
    </EditionMiseAJourContextProvider>
  );
};

export default PageEditionRequeteMiseAJour;
