import { RECEContextData } from "@core/contexts/RECEContext";
import { Droit } from "@model/agent/enum/Droit";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import AfficherMessage from "../utils/AfficherMessage";
import GestionnaireFilAriane from "../utils/GestionnaireFilAriane";
import LiensRECE from "./LiensRECE";
import { TInfoPageRECE } from "./infoPages/InfoPageRECE";

type TElementPageRECEProps = {
  infoPage: Omit<TInfoPageRECE<"">, "url">;
  featureFlags?: FeatureFlag[];
  tousLesDroits?: Droit[];
} & (
  | {
      auMoinsUnDesDroits?: Droit[];
      uniquementLesDroits?: never;
      droitSurUnDesPerimetre?: never;
    }
  | {
      auMoinsUnDesDroits?: never;
      uniquementLesDroits?: Droit[];
      droitSurUnDesPerimetre?: never;
    }
  | {
      auMoinsUnDesDroits?: never;
      uniquementLesDroits?: never;
      droitSurUnDesPerimetre?: { droit: Droit; perimetres: string[] };
    }
);

const ElementPageRECE: React.FC<React.PropsWithChildren<TElementPageRECEProps>> = ({
  infoPage,
  featureFlags,
  tousLesDroits,
  auMoinsUnDesDroits,
  uniquementLesDroits,
  droitSurUnDesPerimetre,
  children
}) => {
  const { utilisateurConnecte } = useContext(RECEContextData);
  const navigate = useNavigate();
  const location = useLocation();

  const utilisateurPeutAccederALaPage = useMemo(() => {
    const utilisateur = {
      aLesFeatureFlags: featureFlags?.length ? featureFlags.every(featureFlag => gestionnaireFeatureFlag.estActif(featureFlag)) : true,
      aTousLesDroits: tousLesDroits?.length ? utilisateurConnecte.estHabilitePour({ tousLesDroits: tousLesDroits }) : true,
      aAuMoinsUnDesDroits: auMoinsUnDesDroits?.length ? utilisateurConnecte.estHabilitePour({ unDesDroits: auMoinsUnDesDroits }) : true,
      aUniquementLesdroits: uniquementLesDroits?.length
        ? utilisateurConnecte.nombreHabilitations === uniquementLesDroits.length &&
          utilisateurConnecte.estHabilitePour({ tousLesDroits: uniquementLesDroits })
        : true,
      aDroitSurUnDesPerimetres: droitSurUnDesPerimetre
        ? utilisateurConnecte.estHabilitePour({
            leDroit: droitSurUnDesPerimetre.droit,
            surUnDesPerimetres: droitSurUnDesPerimetre.perimetres
          })
        : true
    };

    const accesAccorde =
      utilisateur.aLesFeatureFlags &&
      utilisateur.aTousLesDroits &&
      utilisateur.aAuMoinsUnDesDroits &&
      utilisateur.aUniquementLesdroits &&
      utilisateur.aDroitSurUnDesPerimetres;

    if (!accesAccorde) {
      AfficherMessage.erreur("Vous n'êtes pas autorisé à consulter cette page", { fermetureAuto: true });
      navigate(LiensRECE.retourArriere(), { replace: true });
    }

    return accesAccorde;
  }, [utilisateurConnecte, featureFlags, tousLesDroits, auMoinsUnDesDroits, uniquementLesDroits, droitSurUnDesPerimetre]);

  useEffect(() => {
    document.title = infoPage.titre ? `RECE - ${infoPage.titre}` : "RECE";
    GestionnaireFilAriane.ajoutElement({ url: location.pathname, titre: infoPage.titre, niveau: infoPage.niveauNavigation });
  }, [infoPage]);

  return <>{utilisateurPeutAccederALaPage ? children : <></>}</>;
};

export default ElementPageRECE;
