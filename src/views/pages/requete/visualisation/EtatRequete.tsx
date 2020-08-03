import React from "react";
import "./sass/EtatRequete.scss";
import { getText } from "../../../common/widget/Text";
import { IDataTable } from "../MesRequetesPage";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { IReponseApi } from "../DonneesRequeteHook";
import classNames from "classnames";

interface EtatRequeteProps {
  requete: IDataTable;
}

export const EtatRequete: React.FC<EtatRequeteProps> = props => {
  const statut = props.requete.statut as StatutRequete;
  const styles = classNames({
    bleu:
      statut === StatutRequete.ATraiter ||
      statut === StatutRequete.PriseEnCharge ||
      statut === StatutRequete.Transferee,
    gris:
      statut === StatutRequete.Doublon ||
      statut === StatutRequete.TraiteADelivrerDemat ||
      statut === StatutRequete.TraiteAImprimer ||
      statut === StatutRequete.TraiteDelivreDemat ||
      statut === StatutRequete.TraiteImprime,
    Entete: true
  });
  return (
    <div className="etat-requete">
      <h1 className={styles}>{getStatutLibelle(props.requete)}</h1>
    </div>
  );
};

const getRequeteTraiteeLibelle = (data: IDataTable) => {
  return getText("pages.delivrance.apercu.entete.traitee", [
    data.reponse?.prenomOec || "",
    data.reponse?.nomOec || "",
    data.dateStatut
  ]);
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
  if (data.idRequeteInitiale) {
    return getText("pages.delivrance.apercu.entete.enDoublon", [
      data.idRequeteInitiale.toString(),
      data.dateCreation
    ]);
  }
};

const getRequeteTransferee = (data: IDataTable) => {
  return getText("pages.delivrance.apercu.entete.transferee", [
    data.reponse?.prenomOec || "",
    data.reponse?.nomOec || "",
    data.dateStatut
  ]);
};

const getRequeteASigner = (data: IDataTable) => {
  return getText("pages.delivrance.apercu.entete.aSigner", [
    data.reponse?.prenomOec || "",
    data.reponse?.nomOec || "",
    data.dateStatut
  ]);
};

const getStatutLibelle = (data: IDataTable) => {
  switch (data.statut as StatutRequete) {
    case StatutRequete.TraiteADelivrerDemat: {
      return getRequeteTraiteeLibelle(data);
    }
    case StatutRequete.TraiteDelivreDemat: {
      return getRequeteTraiteeLibelle(data);
    }
    case StatutRequete.TraiteAImprimer: {
      return getRequeteTraiteeLibelle(data);
    }
    case StatutRequete.TraiteImprime: {
      return getRequeteTraiteeLibelle(data);
    }
    case StatutRequete.PriseEnCharge: {
      return getRequetePriseEnCharge(data);
    }
    case StatutRequete.ATraiter: {
      return getRequeteATraiter(data);
    }
    case StatutRequete.Doublon: {
      return getRequeteDoublon(data);
    }
    case StatutRequete.Transferee: {
      return getRequeteTransferee(data);
    }
    case StatutRequete.ASigner: {
      return getRequeteASigner(data);
    }
  }
};
