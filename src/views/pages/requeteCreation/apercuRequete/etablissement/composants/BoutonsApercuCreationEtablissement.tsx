import { RECEContext } from "@core/body/RECEContext";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import {
  URL_MES_REQUETES_CREATION,
  URL_RECHERCHE_REQUETE,
  URL_REQUETES_CREATION_SERVICE
} from "@router/ReceUrls";
import { autorisePrendreEnChargeDepuisPageCreation } from "@util/RequetesUtils";
import { getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { useContext, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { BoutonPrendreEnChargeCreation } from "./BoutonPrendreEnChargeCreation";
import "./scss/OngletsApercuCreationEtablissement.scss";

interface BoutonsApercuCreationEtablissementProps {
  requete: IRequeteCreationEtablissement;
}

const RETOUR_RECHERCHE_REQUETE = getLibelle("Retour recherche requêtes");
const RETOUR_MES_REQUETE = getLibelle("Retour mes requêtes");
const RETOUR_REQUETE_SERVICE = getLibelle("Retour requêtes de service");

export const BoutonsApercuCreationEtablissement: React.FC<
  BoutonsApercuCreationEtablissementProps
> = props => {
  const history = useHistory();
  const { rechargementPage } = useContext(RECEContext);

  const estPresentBoutonPriseEnCharge =
    autorisePrendreEnChargeDepuisPageCreation(props.requete);

  const boutonRetour = useMemo(() => {
    const pathname = history.location.pathname;
    const bouton = {
      libelle: RETOUR_RECHERCHE_REQUETE,
      url: URL_RECHERCHE_REQUETE
    };
    if (pathname.startsWith(URL_MES_REQUETES_CREATION)) {
      bouton.libelle = RETOUR_MES_REQUETE;
      bouton.url = URL_MES_REQUETES_CREATION;
    } else if (pathname.startsWith(URL_REQUETES_CREATION_SERVICE)) {
      bouton.libelle = RETOUR_REQUETE_SERVICE;
      bouton.url = URL_REQUETES_CREATION_SERVICE;
    }
    return bouton;
  }, [history]);

  return (
    <div className="BoutonsApercu">
      <Bouton onClick={() => history.push(boutonRetour.url)}>
        {boutonRetour.libelle}
      </Bouton>
      {estPresentBoutonPriseEnCharge && (
        <BoutonPrendreEnChargeCreation
          requete={props.requete}
          onClick={rechargementPage}
        />
      )}
    </div>
  );
};
