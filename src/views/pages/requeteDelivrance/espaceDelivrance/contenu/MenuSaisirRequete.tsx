import { RECEContextData } from "@core/contexts/RECEContext";
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
import { Option, Options } from "@util/Type";
import { getLibelle } from "@util/Utils";
import { BoutonMenu } from "@widget/boutonMenu/BoutonMenu";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
interface MenuSaisirRequeteProps {
  indexTabPanel: number;
  disabled?: boolean;
}

const MenuSaisirRequete: React.FC<MenuSaisirRequeteProps> = props => {
  const navigate = useNavigate();
  const { utilisateurConnecte } = useContext(RECEContextData);
  const clickMenuItem = (nomRequete: string) => {
    if (props.indexTabPanel === 1) {
      switch (nomRequete) {
        case "RDCSC":
          if (
            utilisateurConnecte &&
            utilisateurADroit(Droit.DELIVRER, utilisateurConnecte)
          ) {
            navigate(URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC);
          } else {
            alert("Vous n'avez pas les droits pour ce type de requête");
          }
          break;

        case "RDC":
          navigate(URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC);
          break;

        case "RDLFC":
          navigate(URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDLFC);
          break;

        default:
          break;
      }
    } else {
      switch (nomRequete) {
        case "RDCSC":
          navigate(URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC);
          break;

        case "RDC":
          navigate(URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC);
          break;

        case "RDLFC":
          navigate(URL_MES_REQUETES_DELIVRANCE_SAISIR_RDLFC);
          break;

        default:
          break;
      }
    }
  };

  const listeRequeteCourrier = getListeDesRequetesCourrierAsOptions();

  return (
    <BoutonMenu
      className="MenuSaisirRequete"
      boutonLibelle={getLibelle("Saisir requête courrier")}
      options={listeRequeteCourrier}
      onClickOption={clickMenuItem}
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

function mapSousTypeDelivrance(sousTypeDelivrance: SousTypeDelivrance): Option {
  return {
    cle: sousTypeDelivrance.nom,
    libelle: sousTypeDelivrance.libelle
  };
}

function getListeDesRequetesCourrierAsOptions(): Options {
  let listeRequeteCourrier: Options = [];

  if (
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES)
  ) {
    listeRequeteCourrier = listeRequeteCourrier.concat(
      mapSousTypeDelivrance(SousTypeDelivrance.RDC)
    );
  }

  if (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_CS)) {
    listeRequeteCourrier = listeRequeteCourrier.concat(
      mapSousTypeDelivrance(SousTypeDelivrance.RDCSC)
    );
  }

  if (
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES)
  ) {
    listeRequeteCourrier = listeRequeteCourrier.concat(
      mapSousTypeDelivrance(SousTypeDelivrance.RDLFC)
    );
  }

  return listeRequeteCourrier;
}

export default WithHabilitation(MenuSaisirRequete, "MenuSaisirRequete");
