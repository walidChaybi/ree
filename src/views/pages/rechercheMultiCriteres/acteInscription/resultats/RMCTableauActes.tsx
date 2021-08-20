import React, { useCallback, useEffect, useState } from "react";
import { DESCRIPTION_SAGA } from "../../../../../model/etatcivil/enum/TypeAlerte";
import { TypeFiche } from "../../../../../model/etatcivil/enum/TypeFiche";
import { IAlerte } from "../../../../../model/etatcivil/fiche/IAlerte";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import { getValeurOuVide } from "../../../../common/util/Utils";
import { TableauRece } from "../../../../common/widget/tableau/v2/TableauRece";
import { TableauTypeColumn } from "../../../../common/widget/tableau/v2/TableauTypeColumn";
import { getLibelle } from "../../../../common/widget/Text";
import { FenetreFiche } from "../../../fiche/FenetreFiche";
import { getMessageZeroActe } from "../hook/RMCActeInscriptionUtils";
import { determinerColonnes, NB_ACTE_PAR_PAGE } from "./RMCTableauActesParams";
import { goToLinkRMC, TypeRMC } from "./RMCTableauCommun";

export interface RMCResultatActeProps {
  typeRMC: TypeRMC;
  dataAlertes?: IAlerte[];
  dataRMCActe: IResultatRMCActe[];
  dataTableauRMCActe: IParamsTableau;
  setRangeActe?: (range: string) => void;
  resetTableauActe?: boolean;
  onClickCheckboxCallBack?: (
    index: number,
    isChecked: boolean,
    data: IResultatRMCActe
  ) => void;
}

export const RMCTableauActes: React.FC<RMCResultatActeProps> = ({
  typeRMC,
  dataAlertes,
  dataRMCActe,
  dataTableauRMCActe,
  setRangeActe,
  resetTableauActe,
  onClickCheckboxCallBack
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
  const [selected, setSelected] = useState<Map<number, string>>(new Map([]));
  const [columnHeaders, setColumnHeaders] = useState<TableauTypeColumn[]>([]);

  const hasWarning = useCallback(
    (isChecked: boolean, data: any): boolean => {
      if (isChecked) {
        const alertes = dataAlertes?.filter((alerte: IAlerte) => {
          return (
            alerte?.idActe === data?.idActe && alerte?.type !== DESCRIPTION_SAGA
          );
        });
        return Array.isArray(alertes) && alertes.length > 0;
      }
      return false;
    },
    [dataAlertes]
  );

  const onClickCheckbox = useCallback(
    (index: number, isChecked: boolean, data: IResultatRMCActe): void => {
      const newSelected = new Map(selected);
      if (isChecked) {
        newSelected.set(index, data?.idActe);
      } else {
        newSelected.delete(index);
      }
      setSelected(newSelected);
      onClickCheckboxCallBack &&
        onClickCheckboxCallBack(index, isChecked, data);
    },
    [selected, onClickCheckboxCallBack]
  );

  useEffect(() => {
    const colonnes = determinerColonnes(typeRMC, hasWarning, onClickCheckbox);
    setColumnHeaders(colonnes);
  }, [typeRMC, hasWarning, onClickCheckbox]);

  return (
    <>
      <TableauRece
        idKey={"idActe"}
        onClickOnLine={onClickOnLine}
        columnHeaders={columnHeaders}
        dataState={dataRMCActe}
        paramsTableau={dataTableauRMCActe}
        goToLink={goToLink}
        nbLignesParPage={NB_ACTE_PAR_PAGE}
        resetTableau={resetTableauActe}
        noRows={zeroActe}
      />
      {typeRMC === "Auto" && (
        <div className="ElementsCoches">
          {getLibelle(`${selected.size} élément(s) coché(s)`)}
        </div>
      )}

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
