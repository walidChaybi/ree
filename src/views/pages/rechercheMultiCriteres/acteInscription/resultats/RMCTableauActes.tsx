import React, { useCallback, useEffect, useState } from "react";
import { TypeFiche } from "../../../../../model/etatcivil/enum/TypeFiche";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import { getValeurOuVide } from "../../../../common/util/Utils";
import { TableauRece } from "../../../../common/widget/tableau/v2/TableauRece";
import { getLibelle } from "../../../../common/widget/Text";
import { FenetreFiche } from "../../../fiche/FenetreFiche";
import { getMessageZeroActe } from "../hook/RMCActeInscriptionUtils";
import { determinerColonnes, NB_ACTE_PAR_PAGE } from "./RMCTableauActesParams";
import { goToLinkRMC, TypeRMC } from "./RMCTableauCommun";

export interface RMCResultatActeProps {
  typeRMC: TypeRMC;
  dataRMCActe: IResultatRMCActe[];
  dataTableauRMCActe: IParamsTableau;
  setRangeActe?: (range: string) => void;
  resetTableauActe?: boolean;
}

export const RMCTableauActes: React.FC<RMCResultatActeProps> = ({
  typeRMC,
  dataRMCActe,
  dataTableauRMCActe,
  setRangeActe,
  resetTableauActe
}) => {
  // Gestion du tableau
  const [zeroActe, setZeroActe] = useState<JSX.Element>();

  useEffect(() => {
    if (dataRMCActe && dataRMCActe.length === 0) {
      setZeroActe(getMessageZeroActe());
    }
  }, [dataRMCActe]);

  const goToLink = useCallback(
    (link: string) => {
      const range = goToLinkRMC(link);
      if (range && setRangeActe) {
        setRangeActe(range);
      }
    },
    [setRangeActe]
  );

  // Gestion de la Fenêtre
  const [etatFenetres, setEtatFenetres] = useState<string[]>([]);

  const closeFenetre = (idActe: string, idx: number) => {
    const tableau = [...etatFenetres];
    if (tableau[idx] === idActe) {
      tableau[idx] = "";
      setEtatFenetres(tableau);
    }
  };

  const onClickOnLine = (idActe: string, data: any, idx: number) => {
    const tableau = [...etatFenetres];
    if (tableau[idx] !== idActe) {
      tableau[idx] = idActe;
      setEtatFenetres(tableau);
    }
  };
  const datasFiches = dataRMCActe.map(data => ({
    identifiant: getValeurOuVide(data.idActe),
    categorie: TypeFiche.ACTE
  }));

  // Gestion du clic sur une colonne de type checkbox
  const [selected, setSelected] = useState<string[]>([]);
  const onClickCheckbox = (isChecked: boolean, data: IResultatRMCActe) => {
    const selectedIndex = selected.indexOf(data?.idActe);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, data?.idActe);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  return (
    <>
      <TableauRece
        idKey={"idActe"}
        onClickOnLine={onClickOnLine}
        columnHeaders={determinerColonnes(typeRMC, onClickCheckbox)}
        dataState={dataRMCActe}
        paramsTableau={dataTableauRMCActe}
        goToLink={goToLink}
        nbLignesParPage={NB_ACTE_PAR_PAGE}
        resetTableau={resetTableauActe}
        noRows={zeroActe}
      >
        {typeRMC === "Auto" && selected.length > 0 && (
          <div>{getLibelle(`${selected.length} élément(s) coché(s)`)}</div>
        )}
      </TableauRece>

      {etatFenetres && etatFenetres.length > 0 && (
        <>
          {etatFenetres.map((idActe: string, index: number) => {
            return (
              idActe &&
              idActe !== "" && (
                <FenetreFiche
                  key={`fiche${idActe}${index}`}
                  identifiant={idActe}
                  categorie={TypeFiche.ACTE}
                  datasFiches={datasFiches}
                  index={index}
                  onClose={closeFenetre}
                />
              )
            );
          })}
        </>
      )}
    </>
  );
};
