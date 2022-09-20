import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { BoutonAjouterAlerte } from "@widget/alertes/ajouterAlerte/BoutonAjouterAlerte";
import { IAjouterAlerteFormValue } from "@widget/alertes/ajouterAlerte/contenu/PopinAjouterAlertes";
import { ListeAlertes } from "@widget/alertes/listeAlertes/ListeAlertes";
import React from "react";
import "./scss/BandeauAlertesActe.scss";

export interface BandeauAlertesActeProps {
  alertes: IAlerte[];
  idTypeRegistre?: string;
  ajouterAlerteCallBack: (value: IAjouterAlerteFormValue) => void;
  supprimerAlerteCallBack: (idAlerteActe: string, idActe: string) => void;
  afficherBouton?: boolean;
}

export const BandeauAlertesActe: React.FC<BandeauAlertesActeProps> = ({
  alertes,
  ajouterAlerteCallBack,
  supprimerAlerteCallBack,
  idTypeRegistre,
  afficherBouton
}) => {
  return (
    <div className="BandeauAlertesActe">
      {afficherBouton && (
        <BoutonAjouterAlerte ajouterAlerteCallBack={ajouterAlerteCallBack} />
      )}
      {alertes?.length > 0 && (
        <ListeAlertes
          idTypeRegistre={idTypeRegistre}
          alertes={alertes}
          displayReference={false}
          supprimerAlerteCallBack={supprimerAlerteCallBack}
        />
      )}
    </div>
  );
};
