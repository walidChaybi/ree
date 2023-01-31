import { TypeFamille } from "@model/etatcivil/enum/TypeFamille";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { Alerte, IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { TRequete } from "@model/requete/IRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import { getValeurOuVide, supprimeElement } from "@util/Utils";
import { CompteurElementsCoches } from "@widget/compteurElementsCoches/CompteurElementsCoches";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import React, { useCallback, useEffect, useState } from "react";
import { FenetreFiche } from "../../../fiche/FenetreFiche";
import { IDataFicheProps, IIndex } from "../../../fiche/FichePage";
import { getMessageZeroActe } from "../hook/RMCActeInscriptionUtils";
import { determinerColonnes } from "./RMCTableauActesParams";
import { goToLinkRMC, TypeRMC } from "./RMCTableauCommun";

interface IFenetreFicheActe {
  idActe: string;
  datasFiches: IDataFicheProps[];
  index: IIndex;
  numeroRequete?: TRequete["numero"];
}
export interface RMCResultatActeProps {
  typeRMC: TypeRMC;
  dataRequete?: TRequete;
  dataAlertes?: IAlerte[];
  dataRMCActe: IResultatRMCActe[];
  dataTableauRMCActe: IParamsTableau;
  setRangeActe?: (range: string) => void;
  resetTableauActe?: boolean;
  onClickCheckboxCallBack?: (
    isChecked: boolean,
    data: IResultatRMCActe
  ) => void;
  nbLignesParPage: number;
  nbLignesParAppel: number;
  // Données propre à une fiche acte pour sa pagination/navigation
  getLignesSuivantesOuPrecedentesActe?: (
    ficheIdentifiant: string,
    lien: string
  ) => void;
  idFicheActe?: string;
  dataRMCFicheActe?: IResultatRMCActe[];
  dataTableauRMCFicheActe?: IParamsTableau;
}

export const RMCTableauActes: React.FC<RMCResultatActeProps> = ({
  typeRMC,
  dataRequete,
  dataAlertes,
  dataRMCActe,
  dataTableauRMCActe,
  setRangeActe,
  resetTableauActe,
  onClickCheckboxCallBack,
  nbLignesParPage,
  nbLignesParAppel,
  // Données propre à une fiche acte pour sa pagination/navigation
  getLignesSuivantesOuPrecedentesActe,
  idFicheActe,
  dataRMCFicheActe,
  dataTableauRMCFicheActe
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

  // Gestion des fenêtres fiche acte
  const [etatFenetres, setEtatFenetres] = useState<IFenetreFicheActe[]>([]);

  // Plage de fiche courante dans le tableau de résultat (suite à une RMC Acte)
  const [datasFichesCourantes, setDatasFichesCourante] =
    useState<IDataFicheProps[]>();

  const closeFenetre = (idActe: string, idx: number) => {
    const nouvelEtatFenetres = supprimeElement(
      etatFenetres,
      (etatFenetre: IFenetreFicheActe) => etatFenetre.idActe === idActe
    );
    setEtatFenetres(nouvelEtatFenetres);
  };

  const onClickOnLine = (idActe: string, data: any, index: number) => {
    const etatFenetreTrouve = etatFenetres.find(
      etatFenetre => etatFenetre.idActe === idActe
    );
    if (datasFichesCourantes) {
      if (!etatFenetreTrouve) {
        const nouvelEtatFenetre: IFenetreFicheActe = {
          index: { value: index },
          idActe,
          datasFiches: datasFichesCourantes,
          numeroRequete: dataRequete?.numero
        };
        setEtatFenetres([...etatFenetres, nouvelEtatFenetre]);
      } else {
        // Si l'utilisateur clique sur une fenêtre déjà ouverte alors il faut remettre à jour ces données pour la navigation et son index courant
        // (cf. useEffect (*) dans FichePage.tsx)
        etatFenetreTrouve.datasFiches = datasFichesCourantes;
        etatFenetreTrouve.index = { value: index };
        setEtatFenetres([...etatFenetres]);
      }
    }
  };

  useEffect(() => {
    if (dataRMCFicheActe) {
      const etatFenetreTrouve = etatFenetres.find(
        etatFenetre => etatFenetre.idActe === idFicheActe
      );
      if (etatFenetreTrouve) {
        const datasFiches = dataRMCFicheActe.map(data => ({
          identifiant: getValeurOuVide(data.idActe),
          categorie: TypeFiche.ACTE,
          lienSuivant: dataTableauRMCFicheActe?.nextDataLinkState,
          lienPrecedent: dataTableauRMCFicheActe?.previousDataLinkState
        }));
        etatFenetreTrouve.datasFiches = datasFiches;
        setEtatFenetres([...etatFenetres]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idFicheActe, dataRMCFicheActe, dataTableauRMCFicheActe]);

  useEffect(() => {
    const datasFiches = dataRMCActe.map(data => ({
      identifiant: data.idActe,
      categorie: TypeFiche.ACTE,
      lienSuivant: dataTableauRMCActe?.nextDataLinkState,
      lienPrecedent: dataTableauRMCActe?.previousDataLinkState
    }));
    setDatasFichesCourante(datasFiches);
  }, [dataRMCActe, dataTableauRMCActe]);

  // Gestion du clic sur une colonne de type checkbox
  const [selected, setSelected] = useState<Map<number, string>>(new Map([]));
  const [columnHeaders, setColumnHeaders] = useState<TableauTypeColumn[]>([]);

  const hasWarning = useCallback(
    (isChecked: boolean, data: any): boolean => {
      if (isChecked) {
        const alertes = dataAlertes?.filter((alerte: IAlerte) => {
          return (
            alerte?.idActe === data?.idActe &&
            Alerte.estDeTypeDescriptionSAGA(data.alerte)
          );
        });
        return Array.isArray(alertes) && alertes.length > 0;
      }
      return false;
    },
    [dataAlertes]
  );

  const isCheckboxDisabled = useCallback(
    (data: IResultatRMCActe): boolean => {
      return estProjetActe(dataRequete, data);
    },
    [dataRequete]
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
      onClickCheckboxCallBack && onClickCheckboxCallBack(isChecked, data);
    },
    [selected, onClickCheckboxCallBack]
  );

  useEffect(() => {
    const colonnes = determinerColonnes(
      typeRMC,
      hasWarning,
      isCheckboxDisabled,
      onClickCheckbox,
      dataRequete?.type
    );
    setColumnHeaders(colonnes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeRMC, hasWarning, isCheckboxDisabled, onClickCheckbox]);

  useEffect(() => {
    setSelected(new Map([]));
  }, [resetTableauActe]);

  return (
    <>
      <TableauRece
        idKey={"idActe"}
        onClickOnLine={onClickOnLine}
        columnHeaders={columnHeaders}
        dataState={dataRMCActe}
        paramsTableau={dataTableauRMCActe}
        goToLink={goToLink}
        nbLignesParPage={nbLignesParPage}
        nbLignesParAppel={nbLignesParAppel}
        resetTableau={resetTableauActe}
        noRows={zeroActe}
      />
      {typeRMC === "Auto" && dataRequete?.type === TypeRequete.DELIVRANCE && (
        <CompteurElementsCoches nombreElements={selected.size} />
      )}

      {etatFenetres && etatFenetres.length > 0 && (
        <>
          {etatFenetres.map((fenetreFicheActe: IFenetreFicheActe) => {
            return (
              fenetreFicheActe && (
                <FenetreFiche
                  estConsultation={typeRMC === "Classique"}
                  key={`fiche${fenetreFicheActe.idActe}${fenetreFicheActe.index}`}
                  identifiant={fenetreFicheActe.idActe}
                  categorie={TypeFiche.ACTE}
                  datasFiches={fenetreFicheActe.datasFiches}
                  numeroRequete={fenetreFicheActe.numeroRequete}
                  onClose={closeFenetre}
                  index={fenetreFicheActe.index}
                  nbLignesTotales={dataTableauRMCActe.rowsNumberState || 0}
                  getLignesSuivantesOuPrecedentes={
                    getLignesSuivantesOuPrecedentesActe
                  }
                  nbLignesParAppel={nbLignesParAppel}
                />
              )
            );
          })}
        </>
      )}
    </>
  );
};

function estProjetActe(
  dataRequete: TRequete | undefined,
  data: IResultatRMCActe
): boolean {
  if (dataRequete?.type === TypeRequete.DELIVRANCE) {
    const requeteDelivrance = dataRequete as IRequeteDelivrance;
    if (
      SousTypeDelivrance.estRDDouRDCouRDDP(requeteDelivrance?.sousType) &&
      TypeFamille.estTypeFamilleProjetActe(data.familleRegistre)
    ) {
      return true;
    }
  }
  return false;
}
