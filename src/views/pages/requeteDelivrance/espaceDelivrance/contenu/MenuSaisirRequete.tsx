import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { Option, Options } from "@util/Type";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import { BoutonMenu } from "@widget/boutonMenu/BoutonMenu";
import React from "react";
import { useNavigate } from "react-router";
import LiensRECE from "../../../../../router/LiensRECE";
import {
  INFO_PAGE_SAISIE_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER,
  INFO_PAGE_SAISIE_REQUETE_DELIVRANCE_EXTRAIT_COPIE_COURRIER
} from "../../../../../router/infoPages/InfoPagesEspaceDelivrance";
interface MenuSaisirRequeteProps {
  indexTabPanel: number;
  disabled?: boolean;
}

const MenuSaisirRequete: React.FC<MenuSaisirRequeteProps> = props => {
  const navigate = useNavigate();
  const clickMenuItem = (nomRequete: string) => {
    switch (nomRequete) {
      case "RDCSC":
        navigate(LiensRECE.genererLien(INFO_PAGE_SAISIE_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER.url));
        break;

      case "RDC":
        navigate(LiensRECE.genererLien(INFO_PAGE_SAISIE_REQUETE_DELIVRANCE_EXTRAIT_COPIE_COURRIER.url));
        break;

      default:
        break;
    }
  };

  const listeRequeteCourrier = getListeDesRequetesCourrierAsOptions();

  return (
    <BoutonMenu
      className="MenuSaisirRequete"
      boutonLibelle={"Saisir requête courrier"}
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

const mapSousTypeDelivrance = (sousTypeDelivrance: SousTypeDelivrance): Option => {
  return {
    cle: sousTypeDelivrance.nom,
    libelle: sousTypeDelivrance.libelle
  };
};

const getListeDesRequetesCourrierAsOptions = (): Options => {
  let listeRequeteCourrier: Options = [];

  if (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_CIBLE_EXTRAITS_COPIES)) {
    listeRequeteCourrier = listeRequeteCourrier.concat(mapSousTypeDelivrance(SousTypeDelivrance.RDC));
  }

  if (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_CERTIFS_SITUATION)) {
    listeRequeteCourrier = listeRequeteCourrier.concat(mapSousTypeDelivrance(SousTypeDelivrance.RDCSC));
  }

  return listeRequeteCourrier;
};

export default WithHabilitation(MenuSaisirRequete, "MenuSaisirRequete");
