import { Droit } from "@model/agent/enum/Droit";
import { utilisateurADroit } from "@model/agent/IUtilisateur";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import {
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDLFC,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDLFC
} from "@router/ReceUrls";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import { storeRece } from "@util/storeRece";
import { getLibelle } from "@util/Utils";
import { BoutonMenu, IBoutonMenuItem } from "@widget/boutonMenu/BoutonMenu";
import React from "react";
import { useHistory } from "react-router-dom";
interface MenuSaisirRequeteProps {
  indexTabPanel: number;
  disabled?: boolean;
}

const MenuSaisirRequete: React.FC<MenuSaisirRequeteProps> = props => {
  const history = useHistory();

  const clickMenuItem = (nomRequete: string) => {
    if (props.indexTabPanel === 1) {
      switch (nomRequete) {
        case "RDCSC":
          if (
            storeRece.utilisateurCourant &&
            utilisateurADroit(Droit.DELIVRER, storeRece.utilisateurCourant)
          ) {
            history.push(URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC);
          } else {
            alert("Vous n'avez pas les droits pour ce type de requête");
          }
          break;

        case "RDC":
          history.push(URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC);
          break;

        case "RDLFC":
          history.push(URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDLFC);
          break;

        default:
          break;
      }
    } else {
      switch (nomRequete) {
        case "RDCSC":
          history.push(URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC);
          break;

        case "RDC":
          history.push(URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC);
          break;

        case "RDLFC":
          history.push(URL_MES_REQUETES_DELIVRANCE_SAISIR_RDLFC);
          break;

        default:
          break;
      }
    }
  };

  const listeRequeteCourrier = getListeDesRequetesCourrier();

  return (
    <BoutonMenu
      className="MenuSaisirRequete"
      boutonLibelle={getLibelle("Saisir requête courrier")}
      listeItems={listeRequeteCourrier}
      onClickMenuItem={clickMenuItem}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
    />
  );
};

function mapSousTypeDelivranceVersBoutonMenuItem(
  sousTypeDelivrance: SousTypeDelivrance
): IBoutonMenuItem {
  return {
    key: sousTypeDelivrance.nom,
    libelle: sousTypeDelivrance.libelle
  };
}

function getListeDesRequetesCourrier(): IBoutonMenuItem[] {
  let listeRequeteCourrier: IBoutonMenuItem[] = [];

  if (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC)) {
    listeRequeteCourrier = listeRequeteCourrier.concat(
      mapSousTypeDelivranceVersBoutonMenuItem(SousTypeDelivrance.RDC)
    );
  }

  if (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_CS)) {
    listeRequeteCourrier = listeRequeteCourrier.concat(
      mapSousTypeDelivranceVersBoutonMenuItem(SousTypeDelivrance.RDCSC)
    );
  }

  if (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC)) {
    listeRequeteCourrier = listeRequeteCourrier.concat(
      mapSousTypeDelivranceVersBoutonMenuItem(SousTypeDelivrance.RDLFC)
    );
  }

  return listeRequeteCourrier;
}

export default WithHabilitation(MenuSaisirRequete, "MenuSaisirRequete");
