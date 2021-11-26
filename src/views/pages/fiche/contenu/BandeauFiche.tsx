import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IBandeauFiche } from "../../../../model/etatcivil/fiche/IBandeauFiche";
import "./scss/Bandeau.scss";

export interface BandeauFicheProps {
  dataBandeau: IBandeauFiche;
  elementNumeroLigne: JSX.Element;
}

export const BandeauFiche: React.FC<BandeauFicheProps> = props => {
  const data = props.dataBandeau;

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
          {props.elementNumeroLigne}
          <div className="LignePrenomNom">
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
