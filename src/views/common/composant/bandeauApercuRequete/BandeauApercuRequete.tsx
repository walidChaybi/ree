import { RECEContextData } from "@core/contexts/RECEContext";
import { IService, Service } from "@model/agent/IService";
import { Utilisateur } from "@model/agent/Utilisateur";
import { TRequete } from "@model/requete/IRequete";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import DateUtils from "@util/DateUtils";
import React, { useContext } from "react";
import "./scss/BandeauApercuRequete.scss";

interface BandeauRequeteProps {
  requete: TRequete;
}
export const BandeauRequete: React.FC<BandeauRequeteProps> = ({ requete }) => {
  const { utilisateurs, services } = useContext(RECEContextData);
  const statut = requete.statutCourant.statut;
  return (
    <div className="BandeauRequete">
      <h2 className={getClassNames(statut)}>{getStatutLibellePourRequete(requete, utilisateurs, services)}</h2>
    </div>
  );
};

const getRequeteTraiteeLibelle = (responsable: string, requete: TRequete) => {
  return `Requête traitée par : ${responsable} - Le : ${DateUtils.getFormatDateFromTimestamp(requete.statutCourant.dateEffet)}`;
};

const getRequetePriseEnCharge = (responsable: string, requete: TRequete) => {
  if (requete && responsable) {
    return `Requête prise en charge par : ${responsable} - Le : ${DateUtils.getFormatDateFromTimestamp(requete.statutCourant.dateEffet)}`;
  } else {
    return "WARN ! Non spécifié";
  }
};

const getRequeteATraiter = (responsable: string, requete: TRequete) => {
  if (requete && responsable) {
    return `Requête à traiter, attribuée à ${responsable} - Le : ${DateUtils.getFormatDateFromTimestamp(requete.statutCourant.dateEffet)}`;
  } else {
    return `Requête à traiter non attribuée - Créée le ${DateUtils.getFormatDateFromTimestamp(requete.dateCreation)}`;
  }
};

const getRequeteAValider = (responsable: string, requete: TRequete) => {
  if (requete && responsable) {
    return `Requête à valider, attribuée à ${responsable} - Le : ${DateUtils.getFormatDateFromTimestamp(requete.statutCourant.dateEffet)}`;
  } else {
    return `Requête à valider non attribuée - Créée le ${DateUtils.getFormatDateFromTimestamp(requete.dateCreation)}`;
  }
};

const getRequeteDoublon = (requete: TRequete) => {
  if (requete.numero) {
    return `Requête en doublon, requête déjà en cours avec le N° suivant : ${
      requete.numeroRequeteOrigine
    } - Le : ${DateUtils.getFormatDateFromTimestamp(requete.dateCreation)}`;
  } else {
    return "WARN ! Non spécifié";
  }
};

const getRequeteTransferee = (responsable: string, requete: TRequete) => {
  return `Requête transférée à ${responsable} - Le : ${DateUtils.getFormatDateFromTimestamp(requete.statutCourant.dateEffet)}`;
};

const getRequeteASigner = (responsable: string, requete: TRequete) => {
  return `Requête à signer le ${DateUtils.getFormatDateFromTimestamp(requete.statutCourant.dateEffet)} par ${responsable}`;
};

const getRequeteTransmiseAValideur = (responsable: string, requete: TRequete) => {
  return `Requête transmise à valideur le ${DateUtils.getFormatDateFromTimestamp(requete.statutCourant.dateEffet)} par ${responsable}`;
};

const getRequeteBrouillon = (responsable: string, requete: TRequete) => {
  return `Requête au statut brouillon initiée par ${responsable} - Le : ${DateUtils.getFormatDateFromTimestamp(requete.statutCourant.dateEffet)}`;
};

const getRequeteIgnoree = (responsable: string, requete: TRequete) => {
  return `Requête ignorée le ${DateUtils.getFormatDateFromTimestamp(requete.statutCourant.dateEffet)} par ${responsable}`;
};

const getRequeteRejet = (responsable: string, requete: TRequete) => {
  return `Requête rejetée le ${DateUtils.getFormatDateFromTimestamp(requete.statutCourant.dateEffet)} par ${responsable}`;
};

const getRequeteRejetImpression = (responsable: string, requete: TRequete) => {
  return `Requête en rejet impression - Le ${DateUtils.getFormatDateFromTimestamp(requete.statutCourant.dateEffet)}`;
};

const getStatutLibellePourRequete = (requete: TRequete, utilisateurs: Utilisateur[], services: IService[]) => {
  let responsable = requete.idUtilisateur
    ? (utilisateurs.find(utilisateur => utilisateur.id === requete.idUtilisateur)?.prenomNom ?? "")
    : Service.libelleDepuisId(requete.idService, services);

  return getStatutLibelle(requete, responsable ?? "");
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

  return libelle || getStatutLibelleSuite(requete, responsable);
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

    case StatutRequete.TRANSMISE_A_VALIDEUR:
      libelle = getRequeteTransmiseAValideur(responsable, requete);
      break;
    default:
      libelle = "";
      break;
  }

  return libelle;
}

const getClassNames = (statut: StatutRequete): string => {
  const result = ["Entete"];

  if ([StatutRequete.A_TRAITER, StatutRequete.A_VALIDER, StatutRequete.PRISE_EN_CHARGE, StatutRequete.TRANSFEREE].includes(statut)) {
    result.push("bleu");
  }

  if (
    [
      StatutRequete.BROUILLON,
      StatutRequete.REJET,
      StatutRequete.IGNOREE,
      StatutRequete.DOUBLON,
      StatutRequete.TRAITE_REPONDU,
      StatutRequete.TRAITE_A_DELIVRER_DEMAT,
      StatutRequete.TRAITE_A_IMPRIMER,
      StatutRequete.TRAITE_DELIVRE_DEMAT,
      StatutRequete.TRAITE_IMPRIME,
      StatutRequete.REJET_IMPRESSION
    ].includes(statut)
  ) {
    result.push("gris");
  }

  return result.join(" ");
};
