import React from "react";
import { IAlerte } from "../../../../model/etatcivil/fiche/IAlerte";
import { BoutonAjouterAlerte } from "../../../common/widget/alertes/ajouterAlerte/BoutonAjouterAlerte";
import { IAjouterAlerteFormValue } from "../../../common/widget/alertes/ajouterAlerte/contenu/PopinAjouterAlertes";
import { ListeAlertes } from "../../../common/widget/alertes/listeAlertes/ListeAlertes";
import "./scss/BandeauAlertesActe.scss";

export interface BandeauAlertesActeProps {
  alertes: IAlerte[];
  ajoutAlertePossible: boolean;
  ajouterAlerteCallBack: (value: IAjouterAlerteFormValue) => void;
  supprimerAlerteCallBack: (idAlerteActe: string, idActe: string) => void;
}

export const BandeauAlertesActe: React.FC<BandeauAlertesActeProps> = ({
  alertes,
  ajoutAlertePossible,
  ajouterAlerteCallBack,
  supprimerAlerteCallBack
}) => {
  return (
    <div className="BandeauAlertesActe">
      <BoutonAjouterAlerte
        ajoutAlertePossible={ajoutAlertePossible}
        ajouterAlerteCallBack={ajouterAlerteCallBack}
      />
      {alertes?.length > 0 && (
        <ListeAlertes
          ajoutAlertePossible={ajoutAlertePossible}
          alertes={alertes}
          displayReference={false}
          supprimerAlerteCallBack={supprimerAlerteCallBack}
        />
      )}
    </div>
  );
};
