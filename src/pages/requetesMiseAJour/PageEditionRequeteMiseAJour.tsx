import { TUuidActeParams } from "@model/params/TUuidActeParams";
import { URL_ACCUEIL } from "@router/ReceUrls";
import { Navigate, useParams } from "react-router";
import MiseAJourRequete from "../../composants/pages/requetesMiseAJour/MiseAJourRequete";
import EditionMiseAJourContextProvider from "../../contexts/EditionMiseAJourContextProvider";

interface IPageEditionRequeteMiseAJourProps {
  estMiseAJourAvecMentions?: boolean;
}

const PageEditionRequeteMiseAJour: React.FC<IPageEditionRequeteMiseAJourProps> = ({ estMiseAJourAvecMentions = false }) => {
  const { idActeParam, idRequeteParam } = useParams<TUuidActeParams>();

  return !idActeParam || !idRequeteParam ? (
    <Navigate
      to={URL_ACCUEIL}
      replace
    />
  ) : (
    <EditionMiseAJourContextProvider
      idActe={idActeParam}
      idRequete={idRequeteParam}
      estMiseAJourAvecMentions={estMiseAJourAvecMentions}
    >
      <MiseAJourRequete />
    </EditionMiseAJourContextProvider>
  );
};

export default PageEditionRequeteMiseAJour;
