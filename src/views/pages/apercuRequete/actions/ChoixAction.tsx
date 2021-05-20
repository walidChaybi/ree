import React from "react";
import "./scss/ChoixAction.scss";
import { SousTypeDelivrance } from "../../../../model/requete/v2/enum/SousTypeDelivrance";
import { IDataDetailRequeteApi } from "../../detailRequete/hook/DetailRequeteHook";
import { getLibelle } from "../../../common/widget/Text";
import { MenuAction, IActionOption } from "./MenuAction";

interface IActionProps {
  requete?: IDataDetailRequeteApi;
}
export const ChoixAction: React.FC<IActionProps> = props => {
  const delivrerOptions: IActionOption[] = [
    {
      value: 0,
      label: getLibelle("Certificat de situation"),
      sousTypes: [SousTypeDelivrance.RDCSC.nom, SousTypeDelivrance.RDCSD.nom]
    }
  ];

  const reponseNegativeOptions: IActionOption[] = [
    {
      value: 0,
      label: getLibelle(
        "Requête incomplète ou illisible, complément d'information nécessaire"
      ),
      sousTypes: [SousTypeDelivrance.RDCSC.nom, SousTypeDelivrance.RDCSD.nom]
    },
    {
      value: 1,
      label: getLibelle("Trace d'un mariage actif, courrier de non délivrance"),
      sousTypes: [SousTypeDelivrance.RDCSC.nom, SousTypeDelivrance.RDCSD.nom]
    },
    {
      value: 2,
      label: getLibelle(
        "Ressortissant français ou né en France, courrier de non délivrance"
      ),
      sousTypes: [SousTypeDelivrance.RDCSC.nom, SousTypeDelivrance.RDCSD.nom]
    },
    {
      value: 3,
      label: getLibelle("Ignorer la requête (fin du traitement)"),
      sousTypes: [SousTypeDelivrance.RDCSC.nom, SousTypeDelivrance.RDCSD.nom]
    }
  ];

  const handleDelivrerMenu = (indexMenu: number) => {
    // todo
  };

  const handleReponseNegativeMenu = (indexMenu: number) => {
    // todo
  };

  return (
    <>
      <div className="bloc-choix-action">
        <div className="panel">Actions</div>
        <MenuAction
          titre={"Délivrer"}
          listeActions={delivrerOptions}
          onSelect={handleDelivrerMenu}
          requete={props.requete}
        />
        <MenuAction
          titre={"Réponse négative"}
          listeActions={reponseNegativeOptions}
          onSelect={handleReponseNegativeMenu}
          requete={props.requete}
        />
      </div>
    </>
  );
};
