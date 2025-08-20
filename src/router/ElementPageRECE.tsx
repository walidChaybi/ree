import { RECEContextData } from "@core/contexts/RECEContext";
import { Droit } from "@model/agent/enum/Droit";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import AfficherMessage from "../utils/AfficherMessage";
import GestionnaireFilAriane from "../utils/GestionnaireFilAriane";
import { TInfoPageRECE } from "./infoPages/InfoPageRECE";
import LiensRECE from "./LiensRECE";

type TElementPageRECEProps = {
  infoPage: Omit<TInfoPageRECE<"">, "url">;
  featureFlags?: FeatureFlag[];
  tousLesDroits?: Droit[];
} & (
  | {
      auMoinsUnDesDroits?: Droit[];
      uniquementLesDroits?: never;
      droitSurUnDesPerimetres?: never;
    }
  | {
      auMoinsUnDesDroits?: never;
      uniquementLesDroits?: Droit[];
      droitSurUnDesPerimetres?: never;
    }
  | {
      auMoinsUnDesDroits?: never;
      uniquementLesDroits?: never;
      droitSurUnDesPerimetres?: { droit: Droit; perimetres: string[] };
    }
);

const ElementPageRECE: React.FC<React.PropsWithChildren<TElementPageRECEProps>> = ({
  infoPage,
  featureFlags,
  tousLesDroits,
  auMoinsUnDesDroits,
  uniquementLesDroits,
  droitSurUnDesPerimetres,
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
      aDroitSurUnDesPerimetres: droitSurUnDesPerimetres
        ? utilisateurConnecte.estHabilitePour({
            leDroit: droitSurUnDesPerimetres.droit,
            surUnDesPerimetres: droitSurUnDesPerimetres.perimetres
          })
        : true
    };

    return (
      utilisateur.aLesFeatureFlags &&
      utilisateur.aTousLesDroits &&
      utilisateur.aAuMoinsUnDesDroits &&
      utilisateur.aUniquementLesdroits &&
      utilisateur.aDroitSurUnDesPerimetres
    );
  }, [utilisateurConnecte, featureFlags, tousLesDroits, auMoinsUnDesDroits, uniquementLesDroits, droitSurUnDesPerimetres]);

  useEffect(() => {
    if (!utilisateurPeutAccederALaPage) {
      AfficherMessage.erreur("Vous n'avez pas d'habilitation suffisante. Veuillez contacter votre administrateur.", {
        fermetureAuto: true
      });
      navigate(LiensRECE.retourArriere(), { replace: true });
    }
  }, [utilisateurPeutAccederALaPage]);

  useEffect(() => {
    document.title = infoPage.titre ? `RECE - ${infoPage.titre}` : "RECE";
    GestionnaireFilAriane.ajoutElement({ url: location.pathname, titre: infoPage.titre, niveau: infoPage.niveauNavigation });
  }, [infoPage]);

  return utilisateurPeutAccederALaPage ? <>{children}</> : null;
};

export default ElementPageRECE;
