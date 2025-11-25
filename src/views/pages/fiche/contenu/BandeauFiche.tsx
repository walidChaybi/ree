import { IBandeauFiche } from "@model/etatcivil/fiche/IBandeauFiche";
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import "./scss/Bandeau.scss";

interface BandeauFicheProps {
  dataBandeau: IBandeauFiche;
  elementNumeroLigne: JSX.Element;
}

export const BandeauFiche: React.FC<BandeauFicheProps> = props => {
  const data = props.dataBandeau;

  const getAlertes = () => {
    const alertes = data.alertes;
    let titleAlertes = "";
    if (alertes != null && alertes.length >= 1) {
      alertes.forEach(a => {
        titleAlertes += `${a.alerte}\n`;
      });
    }
    return titleAlertes;
  };

  return (
    <>
      {data && (
        <div className="Bandeau">
          {props.elementNumeroLigne}
          <div className="LigneAlertes">
            {data.alertes != null && data.alertes?.length >= 1 && (
              <div title={getAlertes()}>
                <FaExclamationTriangle
                  className="IconeAlertes"
                  aria-hidden
                />
                {data.alertes[0].alerte}
              </div>
            )}
          </div>
          <div className="LigneDates">
            <div>{`${"Dernière mise à jour :"} ${data.dateDerniereMaj}`}</div>
            <div>{`${"Dernière délivrance :"} ${data.dateDerniereDelivrance}`}</div>
          </div>
        </div>
      )}
    </>
  );
};
