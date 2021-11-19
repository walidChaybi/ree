import React, { useCallback, useEffect, useState } from "react";
import { StatutFiche } from "../../../../../model/etatcivil/enum/StatutFiche";
import {
  FicheUtil,
  TypeFiche
} from "../../../../../model/etatcivil/enum/TypeFiche";
import { DocumentDelivrance } from "../../../../../model/requete/v2/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { TypeRequete } from "../../../../../model/requete/v2/enum/TypeRequete";
import { TRequete } from "../../../../../model/requete/v2/IRequete";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import {
  getValeurOuVide,
  supprimeElement
} from "../../../../common/util/Utils";
import { TableauRece } from "../../../../common/widget/tableau/v2/TableauRece";
import { TableauTypeColumn } from "../../../../common/widget/tableau/v2/TableauTypeColumn";
import { getLibelle } from "../../../../common/widget/Text";
import { FenetreFiche } from "../../../fiche/FenetreFiche";
import { IDataFicheProps, IIndex } from "../../../fiche/FichePage";
import { getMessageZeroInscription } from "../hook/RMCActeInscriptionUtils";
import { goToLinkRMC, TypeRMC } from "./RMCTableauCommun";
import { determinerColonnes } from "./RMCTableauInscriptionsParams";

interface IFenetreFicheInscription {
  idInscription: string;
  datasFiches: IDataFicheProps[];
  index: IIndex;
}

export interface RMCResultatInscriptionProps {
  typeRMC: TypeRMC;
  dataRequete?: TRequete;
  dataRMCInscription: IResultatRMCInscription[];
  dataTableauRMCInscription: IParamsTableau;
  setRangeInscription?: (range: string) => void;
  resetTableauInscription?: boolean;
  onClickCheckboxCallBack?: (
    index: number,
    isChecked: boolean,
    data: IResultatRMCInscription
  ) => void;
  nbLignesParPage: number;
  nbLignesParAppel: number;
  // Données propre à une fiche Inscription pour sa pagination/navigation
  getLignesSuivantesOuPrecedentesInscription?: (
    ficheIdentifiant: string,
    lien: string
  ) => void;
  idFicheInscription?: string;
  dataRMCFicheInscription?: IResultatRMCInscription[];
  dataTableauRMCFicheInscription?: IParamsTableau;
}

export const RMCTableauInscriptions: React.FC<RMCResultatInscriptionProps> = ({
  typeRMC,
  dataRequete,
  dataRMCInscription,
  dataTableauRMCInscription,
  setRangeInscription,
  resetTableauInscription,
  onClickCheckboxCallBack,
  nbLignesParPage,
  nbLignesParAppel,
  // Données propre à une fiche Inscription pour sa pagination/navigation
  getLignesSuivantesOuPrecedentesInscription,
  idFicheInscription,
  dataRMCFicheInscription,
  dataTableauRMCFicheInscription
}) => {
  // Gestion du tableau
  const [zeroInscription, setZeroInscription] = useState<JSX.Element>();

  useEffect(() => {
    if (dataRMCInscription && dataRMCInscription.length === 0) {
      setZeroInscription(getMessageZeroInscription());
    }
  }, [dataRMCInscription]);

  const goToLink = useCallback(
    (link: string) => {
      const range = goToLinkRMC(link);
      if (range && setRangeInscription) {
        setRangeInscription(range);
      }
    },
    [setRangeInscription]
  );

  // Gestion des fenêtre fiche inscription
  const [etatFenetres, setEtatFenetres] = useState<IFenetreFicheInscription[]>(
    []
  );

  // Plage de fiche courante dans le tableau de résultat (suite à une RMC Inscription)
  const [datasFichesCourantes, setDatasFichesCourante] = useState<
    IDataFicheProps[]
  >();

  const closeFenetre = (idInscription: string, idx: number) => {
    const nouvelEtatFenetres = supprimeElement(
      etatFenetres,
      (etatFenetre: IFenetreFicheInscription) =>
        etatFenetre.idInscription === idInscription
    );
    setEtatFenetres(nouvelEtatFenetres);
  };

  const onClickOnLine = (idInscription: string, data: any, index: number) => {
    const etatFenetreTrouve = etatFenetres.find(
      etatFenetre => etatFenetre.idInscription === idInscription
    );
    if (datasFichesCourantes) {
      if (!etatFenetreTrouve) {
        const nouvelEtatFenetre: IFenetreFicheInscription = {
          index: { value: index },
          idInscription,
          datasFiches: datasFichesCourantes
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
    if (dataRMCFicheInscription) {
      const etatFenetreTrouve = etatFenetres.find(
        etatFenetre => etatFenetre.idInscription === idFicheInscription
      );
      if (etatFenetreTrouve) {
        const datasFiches = dataRMCFicheInscription.map(data => ({
          identifiant: getValeurOuVide(data.idInscription),
          categorie: getCategorieFiche(
            data.idInscription,
            dataRMCFicheInscription
          ),
          lienSuivant: dataTableauRMCFicheInscription?.nextDataLinkState,
          lienPrecedent: dataTableauRMCFicheInscription?.previousDataLinkState
        }));
        etatFenetreTrouve.datasFiches = datasFiches;
        setEtatFenetres([...etatFenetres]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    idFicheInscription,
    dataRMCFicheInscription,
    dataTableauRMCFicheInscription
  ]);

  useEffect(() => {
    const datasFiches = dataRMCInscription.map(data => ({
      identifiant: data.idInscription,
      categorie: getCategorieFiche(data.idInscription, dataRMCInscription),
      lienSuivant: dataTableauRMCInscription?.nextDataLinkState,
      lienPrecedent: dataTableauRMCInscription?.previousDataLinkState
    }));
    setDatasFichesCourante(datasFiches);
  }, [dataRMCInscription, dataTableauRMCInscription]);

  // Gestion du clic sur une colonne de type checkbox.
  const [selected, setSelected] = useState<Map<number, string>>(new Map([]));
  const [columnHeaders, setColumnHeaders] = useState<TableauTypeColumn[]>([]);

  const isCheckboxDisabled = useCallback(
    (data: IResultatRMCInscription): boolean => {
      if (dataRequete?.type === TypeRequete.DELIVRANCE) {
        const requeteDelivrance = dataRequete as IRequeteDelivrance;
        if (data?.statutInscription === StatutFiche.INACTIF.libelle) {
          return true;
        }
        if (
          requeteDelivrance?.sousType?.nom === SousTypeDelivrance.RDC.nom ||
          requeteDelivrance?.sousType?.nom === SousTypeDelivrance.RDD.nom
        ) {
          return true;
        }
        return !DocumentDelivrance.estDocumentDelivranceValide(
          data?.categorie,
          requeteDelivrance?.documentDemande
        );
      }
      return false;
    },
    [dataRequete]
  );

  const onClickCheckbox = useCallback(
    (
      index: number,
      isChecked: boolean,
      data: IResultatRMCInscription
    ): void => {
      const newSelected = new Map(selected);
      if (isChecked) {
        newSelected.set(index, data?.idInscription);
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
    const colonnes = determinerColonnes(
      typeRMC,
      isCheckboxDisabled,
      onClickCheckbox,
      dataRequete?.type
    );
    setColumnHeaders(colonnes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeRMC, isCheckboxDisabled, onClickCheckbox]);

  useEffect(() => {
    setSelected(new Map([]));
  }, [resetTableauInscription]);

  return (
    <>
      <TableauRece
        idKey={"idInscription"}
        onClickOnLine={onClickOnLine}
        columnHeaders={columnHeaders}
        dataState={dataRMCInscription}
        paramsTableau={dataTableauRMCInscription}
        goToLink={goToLink}
        resetTableau={resetTableauInscription}
        noRows={zeroInscription}
        nbLignesParPage={nbLignesParPage}
        nbLignesParAppel={nbLignesParAppel}
      />

      {typeRMC === "Auto" && dataRequete?.type === TypeRequete.DELIVRANCE && (
        <div className="ElementsCoches">
          {getLibelle(`${selected.size} élément(s) coché(s)`)}
        </div>
      )}

      {etatFenetres && etatFenetres.length > 0 && (
        <>
          {etatFenetres.map(
            (fenetreFicheInscription: IFenetreFicheInscription) => {
              return (
                fenetreFicheInscription && (
                  <FenetreFiche
                    key={`fiche${fenetreFicheInscription.idInscription}${fenetreFicheInscription.index}`}
                    identifiant={fenetreFicheInscription.idInscription}
                    categorie={getCategorieFicheAPartirDatasFiches(
                      fenetreFicheInscription.idInscription,
                      fenetreFicheInscription.datasFiches
                    )}
                    onClose={closeFenetre}
                    datasFiches={fenetreFicheInscription.datasFiches}
                    index={fenetreFicheInscription.index}
                    nbLignesTotales={
                      dataTableauRMCInscription.rowsNumberState || 0
                    }
                    getLignesSuivantesOuPrecedentes={
                      getLignesSuivantesOuPrecedentesInscription
                    }
                    nbLignesParAppel={nbLignesParAppel}
                  />
                )
              );
            }
          )}
        </>
      )}
    </>
  );
};

function getCategorieFicheAPartirDatasFiches(
  id: string,
  datas: IDataFicheProps[]
): TypeFiche {
  let categorie = "";
  datas.forEach(data => {
    if (data.categorie && data.identifiant === id) {
      categorie = data.categorie;
    }
  });
  return FicheUtil.getTypeFicheFromString(categorie);
}

function getCategorieFiche(
  id: string,
  data: IResultatRMCInscription[]
): TypeFiche {
  let categorie = "";
  data.forEach(repertoire => {
    if (repertoire.categorie && repertoire.idInscription === id) {
      categorie = repertoire.categorie;
    }
  });
  return FicheUtil.getTypeFicheFromString(categorie);
}
