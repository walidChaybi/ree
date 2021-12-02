import classNames from "classnames";
import React from "react";
import { IDataTable } from "../../../../../../model/requete/IDataTable";
import { StatutRequete } from "../../../../../../model/requete/StatutRequete";
import { premiereLettreEnMajusculeLeResteEnMinuscule } from "../../../../../common/util/Utils";
import { getText } from "../../../../../common/widget/Text";
import { IReponseApi } from "../../../espaceDelivrance/v1/hook/DonneesRequeteHook";
import "./scss/EtatRequete.scss";

interface EtatRequeteProps {
  requete: IDataTable;
}

export const EtatRequete: React.FC<EtatRequeteProps> = props => {
  const statut = props.requete.statut;
  const styles = classNames({
    bleu:
      statut === StatutRequete.ATraiter ||
      statut === StatutRequete.PriseEnCharge ||
      statut === StatutRequete.Transferee,
    gris:
      statut === StatutRequete.Doublon ||
      statut === StatutRequete.ATraiterDemat ||
      statut === StatutRequete.AImprimer ||
      statut === StatutRequete.TraiteDemat ||
      statut === StatutRequete.Imprime,
    Entete: true
  });
  return (
    <div className="etat-requete">
      <h1 className={styles}>{getStatutLibelle(props.requete)}</h1>
    </div>
  );
};

const isReponseAttribuee = (reponse: IReponseApi) => {
  return reponse.prenomOec && reponse.nomOec;
};

const getRequetePriseEnCharge = (data: IDataTable) => {
  if (data.reponse && isReponseAttribuee(data.reponse)) {
    return getText("pages.delivrance.apercu.entete.priseEnCharge", [
      data.reponse.prenomOec,
      data.reponse.nomOec,
      data.dateStatut
    ]);
  } else {
    return "WARN ! Non spécifié";
  }
};

const getRequeteATraiter = (data: IDataTable) => {
  if (data.reponse && isReponseAttribuee(data.reponse)) {
    return getText("pages.delivrance.apercu.entete.aTraiterAttribuee", [
      data.reponse.prenomOec,
      data.reponse.nomOec,
      data.dateStatut
    ]);
  } else {
    return getText("pages.delivrance.apercu.entete.aTraiterNonAttribuee", [
      data.dateCreation
    ]);
  }
};

const getRequeteDoublon = (data: IDataTable) => {
  let text = "";
  if (data.idRequeteInitiale) {
    text = getText("pages.delivrance.apercu.entete.enDoublon", [
      data.idRequeteInitiale.toString(),
      data.dateCreation
    ]);
  }
  return text;
};

const getRequeteTraiteeLibelle = (data: IDataTable) => {
  return getTextAvecPrenomNomStatut(
    data,
    "pages.delivrance.apercu.entete.traitee"
  );
};

const getRequeteTransferee = (dataRT: IDataTable) => {
  return getTextAvecPrenomNomStatut(
    dataRT,
    "pages.delivrance.apercu.entete.transferee"
  );
};

const getRequeteASigner = (dataRaS: IDataTable) => {
  return getTextAvecPrenomNomStatut(
    dataRaS,
    "pages.delivrance.apercu.entete.aSigner"
  );
};

const getStatutLibelle = (data: IDataTable) => {
  let statutLibelle = "";
  formatNomPrenom(data);
  switch (data.statut) {
    case StatutRequete.ATraiterDemat:
    case StatutRequete.TraiteDemat:
    case StatutRequete.AImprimer:
    case StatutRequete.Imprime: {
      statutLibelle = getRequeteTraiteeLibelle(data);
      break;
    }

    case StatutRequete.PriseEnCharge: {
      statutLibelle = getRequetePriseEnCharge(data);
      break;
    }
    case StatutRequete.ATraiter: {
      statutLibelle = getRequeteATraiter(data);
      break;
    }
    case StatutRequete.Doublon: {
      statutLibelle = getRequeteDoublon(data);
      break;
    }
    case StatutRequete.Transferee: {
      statutLibelle = getRequeteTransferee(data);
      break;
    }
    case StatutRequete.ASigner: {
      statutLibelle = getRequeteASigner(data);
      break;
    }
    default: {
      statutLibelle = "";
      break;
    }
  }
  return statutLibelle;
};

function formatNomPrenom(data: IDataTable) {
  if (data.reponse) {
    data.reponse.prenomOec = premiereLettreEnMajusculeLeResteEnMinuscule(
      data.reponse.prenomOec
    );
    data.reponse.nomOec = data.reponse.nomOec.toLocaleUpperCase();
  }
}

function getTextAvecPrenomNomStatut(data: IDataTable, msgKey: string) {
  return getText(msgKey, [
    data.reponse?.prenomOec || "",
    data.reponse?.nomOec || "",
    data.dateStatut
  ]);
}
