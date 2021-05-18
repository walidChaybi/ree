import React from "react";
import "./scss/ChoixAction.scss";
import { SousTypeDelivrance } from "../../../../model/requete/v2/enum/SousTypeDelivrance";
import { IDataDetailRequeteApi } from "../../detailRequete/hook/DetailRequeteHook";
import { getLibelle } from "../../../common/widget/Text";

interface IActionProps {
  requete: IDataDetailRequeteApi;
}

interface IActionOption {
  value: number;
  label: string;
  title?: boolean;
  sousTypes?: string[];
}

export const ChoixAction: React.FC<IActionProps> = props => {
  const delivrerOptions: IActionOption[] = [
    {
      value: 0,
      label: getLibelle("Délivrer"),
      title: true
    },
    {
      value: 1,
      label: getLibelle("Certificat de situation"),
      sousTypes: [SousTypeDelivrance.RDCSC.nom, SousTypeDelivrance.RDCSD.nom]
    }
  ];

  const reponseNegativeOptions: IActionOption[] = [
    {
      value: 0,
      label: getLibelle("Réponse négative"),
      title: true
    },
    {
      value: 1,
      label: getLibelle(
        "Requête incomplète ou illisible, complément d'information nécessaire"
      ),
      sousTypes: [SousTypeDelivrance.RDCSC.nom, SousTypeDelivrance.RDCSD.nom]
    },
    {
      value: 2,
      label: getLibelle("Trace d'un mariage actif, courrier de non délivrance"),
      sousTypes: [SousTypeDelivrance.RDCSC.nom, SousTypeDelivrance.RDCSD.nom]
    },
    {
      value: 3,
      label: getLibelle(
        "Ressortissant français ou né en France, courrier de non délivrance"
      ),
      sousTypes: [SousTypeDelivrance.RDCSC.nom, SousTypeDelivrance.RDCSD.nom]
    },
    {
      value: 4,
      label: getLibelle("Ignorer la requête (fin du traitement)"),
      sousTypes: [SousTypeDelivrance.RDCSC.nom, SousTypeDelivrance.RDCSD.nom]
    }
  ];

  const onDelivrerChange = () => {
    // TODO
  };

  const onReponseNegativeChange = () => {
    // TODO
  };

  return (
    <>
      <div className="bloc-choix-action choix-action">
        <div className="panel">{getLibelle("Actions")}</div>
        <select
          className="select-choix-action"
          defaultValue=""
          onChange={onDelivrerChange}
        >
          {delivrerOptions.map(
            el =>
              showChoixAction(props.requete.data, el.sousTypes) && (
                <option key={el.value} value={el.value} hidden={el?.title}>
                  {el.label}
                </option>
              )
          )}
        </select>
        <select
          className="select-choix-action"
          defaultValue=""
          onChange={onReponseNegativeChange}
        >
          {reponseNegativeOptions.map(
            el =>
              showChoixAction(props.requete.data, el.sousTypes) && (
                <option key={el.value} value={el.value} hidden={el?.title}>
                  {el.label}
                </option>
              )
          )}
        </select>
      </div>
    </>
  );
};

function showChoixAction(
  detailRequeteState: any,
  sousTypes?: string[]
): boolean {
  if (sousTypes) {
    return sousTypes.includes(detailRequeteState?.sousType.nom);
  }
  return true;
}
