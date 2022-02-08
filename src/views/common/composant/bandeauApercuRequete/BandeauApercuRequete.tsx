import classNames from "classnames";
import React from "react";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { TRequete } from "../../../../model/requete/IRequete";
import { getFormatDateFromTimestamp } from "../../util/DateUtils";
import { storeRece } from "../../util/storeRece";
import {
  formatNom,
  getLibelle,
  premiereLettreEnMajusculeLeResteEnMinuscule
} from "../../util/Utils";
import "./scss/BandeauApercuRequete.scss";

interface BandeauRequeteProps {
  requete: TRequete;
}
export const BandeauRequete: React.FC<BandeauRequeteProps> = props => {
  const statut = props.requete.statutCourant.statut;
  const styles = classNames(getClassName(statut));
  return (
    <div className="BandeauRequete">
      <h1 className={styles}>{getStatutLibellePourRequete(props.requete)}</h1>
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
    return getLibelle(
      `Requête à traiter non attribuée - Créée le ${getFormatDateFromTimestamp(
        requete.dateCreation
      )}`
    );
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
    return getLibelle(
      `Requête à valider non attribuée - Créée le ${getFormatDateFromTimestamp(
        requete.dateCreation
      )}`
    );
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

const getRequeteRejetImpression = (responsable: string, requete: TRequete) => {
  return getLibelle(
    `Requête en rejet impression - Le ${getFormatDateFromTimestamp(
      requete.statutCourant.dateEffet
    )}`
  );
};

const getStatutLibellePourRequete = (requete: TRequete) => {
  let responsable = requete.idUtilisateur
    ? `${premiereLettreEnMajusculeLeResteEnMinuscule(
        storeRece.getPrenomUtilisateurFromID(requete.idUtilisateur)
      )} ${formatNom(storeRece.getNomUtilisateurFromID(requete.idUtilisateur))}`
    : storeRece.getLibelleEntite(requete.idEntite);
  responsable = responsable ? responsable : "";

  return getStatutLibelle(requete, responsable);
};

function getStatutLibelle(requete: TRequete, responsable: string) {
  let libelle;
  switch (requete.statutCourant.statut) {
    case StatutRequete.TRAITE_A_DELIVRER_DEMAT:
    case StatutRequete.TRAITE_DELIVRE_DEMAT:
    case StatutRequete.TRAITE_A_IMPRIMER:
    case StatutRequete.TRAITE_IMPRIME:
    case StatutRequete.TRAITE_REPONDU:
      libelle = getRequeteTraiteeLibelle(responsable, requete);
      break;

    case StatutRequete.PRISE_EN_CHARGE:
      libelle = getRequetePriseEnCharge(responsable, requete);
      break;

    case StatutRequete.A_TRAITER:
      libelle = getRequeteATraiter(responsable, requete);
      break;

    case StatutRequete.DOUBLON:
      libelle = getRequeteDoublon(requete);
      break;

    default:
      libelle = "";
      break;
  }

  return libelle ? libelle : getStatutLibelleSuite(requete, responsable);
}
function getStatutLibelleSuite(requete: TRequete, responsable: string) {
  let libelle;
  switch (requete.statutCourant.statut) {
    case StatutRequete.TRANSFEREE:
      libelle = getRequeteTransferee(responsable, requete);
      break;

    case StatutRequete.A_SIGNER:
      libelle = getRequeteASigner(responsable, requete);
      break;

    case StatutRequete.BROUILLON:
      libelle = getRequeteBrouillon(responsable, requete);
      break;

    case StatutRequete.A_VALIDER:
      libelle = getRequeteAValider(responsable, requete);
      break;

    case StatutRequete.IGNOREE:
      libelle = getRequeteIgnoree(responsable, requete);
      break;

    case StatutRequete.REJET:
      libelle = getRequeteRejet(responsable, requete);
      break;

    case StatutRequete.REJET_IMPRESSION:
      libelle = getRequeteRejetImpression(responsable, requete);
      break;

    default:
      libelle = "";
      break;
  }
  return libelle;
}
function getClassName(statut: StatutRequete) {
  return {
    bleu: estBleu(),
    gris: estGris(),
    Entete: true
  };

  function estGris() {
    return (
      statut === StatutRequete.BROUILLON ||
      statut === StatutRequete.REJET ||
      statut === StatutRequete.IGNOREE ||
      statut === StatutRequete.DOUBLON ||
      statut === StatutRequete.TRAITE_REPONDU ||
      statut === StatutRequete.TRAITE_A_DELIVRER_DEMAT ||
      statut === StatutRequete.TRAITE_A_IMPRIMER ||
      statut === StatutRequete.TRAITE_DELIVRE_DEMAT ||
      statut === StatutRequete.TRAITE_IMPRIME ||
      statut === StatutRequete.REJET_IMPRESSION
    );
  }

  function estBleu() {
    return (
      statut === StatutRequete.A_TRAITER ||
      statut === StatutRequete.A_VALIDER ||
      statut === StatutRequete.PRISE_EN_CHARGE ||
      statut === StatutRequete.TRANSFEREE
    );
  }
}
