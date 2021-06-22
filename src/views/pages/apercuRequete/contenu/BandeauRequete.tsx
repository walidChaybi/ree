import classNames from "classnames";
import React from "react";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { TRequete } from "../../../../model/requete/v2/IRequete";
import { getFormatDateFromTimestamp } from "../../../common/util/DateUtils";
import {
  formatNom,
  premiereLettreEnMajusculeLeResteEnMinuscule
} from "../../../common/util/Utils";
import { getLibelle } from "../../../common/widget/Text";
import "./scss/BandeauRequete.scss";

interface BandeauRequeteProps {
  detailRequete: TRequete;
}

interface OfficierOec {
  nom: string;
  prenom: string;
}

export const BandeauRequete: React.FC<BandeauRequeteProps> = props => {
  const statut = props.detailRequete.statutCourant.statut;
  const styles = classNames({
    bleu:
      statut === StatutRequete.A_TRAITER ||
      statut === StatutRequete.A_VALIDER ||
      statut === StatutRequete.PRISE_EN_CHARGE ||
      statut === StatutRequete.TRANSFEREE,
    gris:
      statut === StatutRequete.BROUILLON ||
      statut === StatutRequete.REJET ||
      statut === StatutRequete.IGNOREE ||
      statut === StatutRequete.DOUBLON ||
      statut === StatutRequete.TRAITE_REPONDU ||
      statut === StatutRequete.TRAITE_A_DELIVRER_DEMAT ||
      statut === StatutRequete.TRAITE_A_IMPRIMER ||
      statut === StatutRequete.TRAITE_DELIVRE_DEMAT ||
      statut === StatutRequete.TRAITE_IMPRIME,
    Entete: true
  });
  return (
    <div className="BandeauRequete">
      <h1 className={styles}>{getStatutLibelle(props.detailRequete)}</h1>
    </div>
  );
};

const getRequeteTraiteeLibelle = (officier: OfficierOec, requete: TRequete) => {
  return getLibelle(
    `Requête traitée par : ${officier.prenom || ""} ${
      officier.nom || ""
    } - Le : ${getFormatDateFromTimestamp(requete.statutCourant.dateEffet)}`
  );
};

const getRequetePriseEnCharge = (officier: OfficierOec, requete: TRequete) => {
  if (requete && officier.prenom && officier.nom) {
    return getLibelle(
      `Requête prise en charge par : ${officier.prenom || ""} ${
        officier.nom || ""
      } - Le : ${getFormatDateFromTimestamp(requete.statutCourant.dateEffet)}`
    );
  } else {
    return "WARN ! Non spécifié";
  }
};

const getRequeteATraiter = (officier: OfficierOec, requete: TRequete) => {
  if (requete && officier.prenom && officier.nom) {
    return getLibelle(
      `Requête à traiter, attribuée à ${officier.prenom || ""} ${
        officier.nom || ""
      } - Le : ${getFormatDateFromTimestamp(requete.statutCourant.dateEffet)}`
    );
  } else {
    return getLibelle(`Requête à traiter non attribuée - Créée le
      ${getFormatDateFromTimestamp(requete.dateCreation)}`);
  }
};

const getRequeteAValider = (officier: OfficierOec, requete: TRequete) => {
  if (requete && officier.prenom && officier.nom) {
    return getLibelle(
      `Requête à valider, attribuée à ${officier.prenom || ""} ${
        officier.nom || ""
      } - Le : ${getFormatDateFromTimestamp(requete.statutCourant.dateEffet)}`
    );
  } else {
    return getLibelle(`Requête à valider non attribuée - Créée le
      ${getFormatDateFromTimestamp(requete.dateCreation)}`);
  }
};

const getRequeteDoublon = (requete: TRequete) => {
  if (requete.numero) {
    return getLibelle(
      `Requête en doublon, requête déjà en cours avec le N° suivant : ${
        requete.numero
      } - Le : ${getFormatDateFromTimestamp(requete.dateCreation)}`
    );
  } else {
    return "WARN ! Non spécifié";
  }
};

const getRequeteTransferee = (officier: OfficierOec, requete: TRequete) => {
  return getLibelle(
    `Requête transférée à ${officier.prenom || ""} ${
      officier.nom || ""
    } - Le : ${getFormatDateFromTimestamp(requete.statutCourant.dateEffet)}`
  );
};

const getRequeteASigner = (officier: OfficierOec, requete: TRequete) => {
  return getLibelle(
    `Requête à signer le ${getFormatDateFromTimestamp(
      requete.statutCourant.dateEffet
    )} par ${officier.prenom || ""} ${officier.nom || ""}`
  );
};

const getRequeteBrouillon = (officier: OfficierOec, requete: TRequete) => {
  return getLibelle(
    `Requête au statut brouillon initiée par ${officier.prenom || ""} ${
      officier.nom || ""
    } - Le : ${getFormatDateFromTimestamp(requete.statutCourant.dateEffet)}`
  );
};

const getRequeteIgnoree = (officier: OfficierOec, requete: TRequete) => {
  return getLibelle(
    `Requête ignorée le ${getFormatDateFromTimestamp(
      requete.statutCourant.dateEffet
    )} par ${officier.prenom || ""} ${officier.nom || ""}`
  );
};

const getRequeteRejet = (officier: OfficierOec, requete: TRequete) => {
  return getLibelle(
    `Requête rejetée le ${getFormatDateFromTimestamp(
      requete.statutCourant.dateEffet
    )} par ${officier.prenom || ""} ${officier.nom || ""}`
  );
};

const getStatutLibelle = (requete: TRequete) => {
  // TODO US 532 Appel au cache (Store RECE) pour récupérer les informations de l'OEC

  const officier = {
    nom: formatNom("nomOec"),
    prenom: premiereLettreEnMajusculeLeResteEnMinuscule("prenomOec")
  };

  switch (requete.statutCourant.statut) {
    case StatutRequete.TRAITE_A_DELIVRER_DEMAT:
    case StatutRequete.TRAITE_DELIVRE_DEMAT:
    case StatutRequete.TRAITE_A_IMPRIMER:
    case StatutRequete.TRAITE_IMPRIME:
    case StatutRequete.TRAITE_REPONDU: {
      return getRequeteTraiteeLibelle(officier, requete);
    }
    case StatutRequete.PRISE_EN_CHARGE: {
      return getRequetePriseEnCharge(officier, requete);
    }
    case StatutRequete.A_TRAITER: {
      return getRequeteATraiter(officier, requete);
    }
    case StatutRequete.DOUBLON: {
      return getRequeteDoublon(requete);
    }
    case StatutRequete.TRANSFEREE: {
      return getRequeteTransferee(officier, requete);
    }
    case StatutRequete.A_SIGNER: {
      return getRequeteASigner(officier, requete);
    }
    case StatutRequete.BROUILLON: {
      return getRequeteBrouillon(officier, requete);
    }
    case StatutRequete.A_VALIDER: {
      return getRequeteAValider(officier, requete);
    }
    case StatutRequete.IGNOREE: {
      return getRequeteIgnoree(officier, requete);
    }
    case StatutRequete.REJET: {
      return getRequeteRejet(officier, requete);
    }
  }
};
