import React from "react";
import "./sass/Bandeau.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export interface BandeauFicheProps {
  dataBandeau: IDataBandeauFicheProps;
}

export interface IAlerte {
  alerte: string;
  dateCreation: number;
}

export interface IDataBandeauFicheProps {
  categorie: string;
  identifiant: string;
  registre?: string;
  annee: string;
  numero: string;
  statut?: string;
  prenom1: string;
  nom1: string;
  prenom2?: string;
  nom2?: string;
  alertes?: IAlerte[];
  dateDerniereMaj: string;
  dateDerniereDelivrance: string;
}

export const BandeauFiche: React.FC<BandeauFicheProps> = props => {
  const data = props.dataBandeau;

  function getPrenomNom() {
    let prenomNom = `${data.prenom1} ${data.nom1}`;
    if (data.prenom2 != null && data.nom2 != null) {
      prenomNom = `${prenomNom} et ${data.prenom2} ${data.nom2}`;
    }
    return prenomNom;
  }

  function getAlertes() {
    const alertes = data.alertes;
    let titleAlertes = "";
    if (alertes != null && alertes.length >= 1) {
      alertes.forEach(a => {
        titleAlertes += `${a.alerte}\n`;
      });
    }
    return titleAlertes;
  }

  return (
    <>
      {data && (
        <div className="Bandeau">
          {data.registre != null && (
            <div className="InfoImportante">{`Registre : ${data.statut}`}</div>
          )}
          <div className="InfoImportante LigneNumero">
            <div>{`${data.categorie.toLocaleUpperCase()} N° ${data.annee} - ${
              data.numero
            }`}</div>
            <div className="statusFiche">
              {data.statut != null && (
                <>{`Statut de la fiche : ${data.statut}`}</>
              )}
            </div>
          </div>
          <div className="LignePrenomNom">
            <div className="InfoImportante">{getPrenomNom()}</div>
            <div className="alertes">
              {data.alertes != null && data.alertes?.length >= 1 && (
                <div title={getAlertes()}>
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="IconeAlertes"
                  />
                  {data.alertes[0].alerte}
                </div>
              )}
            </div>
          </div>
          <div className="LigneDates">
            <div>{`Date dernière mise à jour : ${data.dateDerniereMaj}`}</div>
            <div>
              {`Date dernière délivrance : ${data.dateDerniereDelivrance}`}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
