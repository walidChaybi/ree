import classNames from "classnames";
import React from "react";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { TRequete } from "../../../../model/requete/v2/IRequete";
import { getFormatDateFromTimestamp } from "../../../common/util/DateUtils";
import { storeRece } from "../../../common/util/storeRece";
import {
  formatNom,
  premiereLettreEnMajusculeLeResteEnMinuscule
} from "../../../common/util/Utils";
import { getLibelle } from "../../../common/widget/Text";
import "./scss/BandeauRequete.scss";

interface BandeauRequeteProps {
  detailRequete: TRequete;
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

const getRequeteTraiteeLibelle = (responsable: string, requete: TRequete) => {
  return getLibelle(
    `Requête traitée par : ${responsable} - Le : ${getFormatDateFromTimestamp(
      requete.statutCourant.dateEffet
    )}`
  );
};

const getRequetePriseEnCharge = (responsable: string, requete: TRequete) => {
  if (requete && responsable) {
    return getLibelle(
      `Requête prise en charge par : ${responsable} - Le : ${getFormatDateFromTimestamp(
        requete.statutCourant.dateEffet
      )}`
    );
  } else {
    return "WARN ! Non spécifié";
  }
};

const getRequeteATraiter = (responsable: string, requete: TRequete) => {
  if (requete && responsable) {
    return getLibelle(
      `Requête à traiter, attribuée à ${responsable} - Le : ${getFormatDateFromTimestamp(
        requete.statutCourant.dateEffet
      )}`
    );
  } else {
    return getLibelle(`Requête à traiter non attribuée - Créée le
      ${getFormatDateFromTimestamp(requete.dateCreation)}`);
  }
};

const getRequeteAValider = (responsable: string, requete: TRequete) => {
  if (requete && responsable) {
    return getLibelle(
      `Requête à valider, attribuée à ${responsable} - Le : ${getFormatDateFromTimestamp(
        requete.statutCourant.dateEffet
      )}`
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

const getRequeteTransferee = (responsable: string, requete: TRequete) => {
  return getLibelle(
    `Requête transférée à ${responsable} - Le : ${getFormatDateFromTimestamp(
      requete.statutCourant.dateEffet
    )}`
  );
};

const getRequeteASigner = (responsable: string, requete: TRequete) => {
  return getLibelle(
    `Requête à signer le ${getFormatDateFromTimestamp(
      requete.statutCourant.dateEffet
    )} par ${responsable}`
  );
};

const getRequeteBrouillon = (responsable: string, requete: TRequete) => {
  return getLibelle(
    `Requête au statut brouillon initiée par ${responsable} - Le : ${getFormatDateFromTimestamp(
      requete.statutCourant.dateEffet
    )}`
  );
};

const getRequeteIgnoree = (responsable: string, requete: TRequete) => {
  return getLibelle(
    `Requête ignorée le ${getFormatDateFromTimestamp(
      requete.statutCourant.dateEffet
    )} par ${responsable}`
  );
};

const getRequeteRejet = (responsable: string, requete: TRequete) => {
  return getLibelle(
    `Requête rejetée le ${getFormatDateFromTimestamp(
      requete.statutCourant.dateEffet
    )} par ${responsable}`
  );
};

const getStatutLibelle = (requete: TRequete) => {
  // TODO US 532 Appel au cache (Store RECE) pour récupérer les informations de l'OEC
  let responsable = requete.idUtilisateur
    ? `${premiereLettreEnMajusculeLeResteEnMinuscule(
        storeRece.getPrenomUtilisateurFromID(requete.idUtilisateur)
      )} ${formatNom(storeRece.getNomUtilisateurFromID(requete.idUtilisateur))}`
    : storeRece.getLibelleEntite(requete.idEntite);
  responsable = responsable ? responsable : "";

  switch (requete.statutCourant.statut) {
    case StatutRequete.TRAITE_A_DELIVRER_DEMAT:
    case StatutRequete.TRAITE_DELIVRE_DEMAT:
    case StatutRequete.TRAITE_A_IMPRIMER:
    case StatutRequete.TRAITE_IMPRIME:
    case StatutRequete.TRAITE_REPONDU: {
      return getRequeteTraiteeLibelle(responsable, requete);
    }
    case StatutRequete.PRISE_EN_CHARGE: {
      return getRequetePriseEnCharge(responsable, requete);
    }
    case StatutRequete.A_TRAITER: {
      return getRequeteATraiter(responsable, requete);
    }
    case StatutRequete.DOUBLON: {
      return getRequeteDoublon(requete);
    }
    case StatutRequete.TRANSFEREE: {
      return getRequeteTransferee(responsable, requete);
    }
    case StatutRequete.A_SIGNER: {
      return getRequeteASigner(responsable, requete);
    }
    case StatutRequete.BROUILLON: {
      return getRequeteBrouillon(responsable, requete);
    }
    case StatutRequete.A_VALIDER: {
      return getRequeteAValider(responsable, requete);
    }
    case StatutRequete.IGNOREE: {
      return getRequeteIgnoree(responsable, requete);
    }
    case StatutRequete.REJET: {
      return getRequeteRejet(responsable, requete);
    }
  }
};
