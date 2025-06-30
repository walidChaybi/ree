import { typesFamilleProjetActe } from "@model/etatcivil/enum/TypeFamille";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { Alerte, IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { TRequete } from "@model/requete/IRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { IFenetreFicheActe } from "@pages/rechercheMultiCriteres/common/IFenetreFicheActeInscription";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import { supprimeElement } from "@util/Utils";
import { CompteurElementsCoches } from "@widget/compteurElementsCoches/CompteurElementsCoches";
import { getLigneTableauVide } from "@widget/tableau/TableUtils";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { IConteneurElementPropsPartielles } from "@widget/tableau/TableauRece/colonneElements/ConteneurElement";
import { TChangeEventSurHTMLInputElement } from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import { IColonneCaseACocherParams } from "@widget/tableau/TableauRece/colonneElements/caseACocher/ColonneCasesACocher";
import React, { useCallback, useEffect, useState } from "react";
import { FenetreFiche } from "../../../fiche/FenetreFiche";
import { IDataFicheProps } from "../../../fiche/FichePage";
import { getColonnesTableauActes } from "./RMCTableauActesParams";
import { TypeRMC, goToLinkRMC } from "./RMCTableauCommun";

interface RMCResultatActeProps {
  typeRMC: TypeRMC;
  dataRequete?: TRequete;
  dataAlertes?: IAlerte[];
  dataRMCActe: ResultatRMCActe[];
  dataTableauRMCActe: IParamsTableau;
  setRangeActe?: (range: string) => void;
  resetTableauActe?: boolean;
  onClickCheckboxCallBack?: (event: TChangeEventSurHTMLInputElement, data: ResultatRMCActe) => void;
  nbLignesParPage: number;
  nbLignesParAppel: number;
  // Données propre à une fiche acte pour sa pagination/navigation
  getLignesSuivantesOuPrecedentesActe?: (ficheIdentifiant: string, lien: string) => void;
  idFicheActe?: string;
  dataRMCFicheActe?: ResultatRMCActe[];
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
  const [datasFichesCourantes, setDatasFichesCourantes] = useState<IDataFicheProps[]>();

  const closeFenetre = (idActe: string, idx: number) => {
    const nouvelEtatFenetres = supprimeElement(etatFenetres, (etatFenetre: IFenetreFicheActe) => etatFenetre.idActe === idActe);
    setEtatFenetres(nouvelEtatFenetres);
  };

  const onClickOnLine = (idActe: string, data: any, index: number) => {
    const etatFenetreTrouve = etatFenetres.find(etatFenetre => etatFenetre.idActe === idActe);
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
      const etatFenetreTrouve = etatFenetres.find(etatFenetre => etatFenetre.idActe === idFicheActe);
      if (etatFenetreTrouve) {
        const datasFiches = dataRMCFicheActe.map(data => ({
          identifiant: data.id,
          categorie: TypeFiche.ACTE,
          lienSuivant: dataTableauRMCFicheActe?.nextDataLinkState,
          lienPrecedent: dataTableauRMCFicheActe?.previousDataLinkState
        }));
        etatFenetreTrouve.datasFiches = datasFiches;
        setEtatFenetres([...etatFenetres]);
      }
    }
  }, [idFicheActe, dataRMCFicheActe, dataTableauRMCFicheActe]);

  useEffect(() => {
    setDatasFichesCourantes(
      dataRMCActe.map(data => ({
        identifiant: data.id,
        categorie: TypeFiche.ACTE,
        lienSuivant: dataTableauRMCActe?.nextDataLinkState,
        lienPrecedent: dataTableauRMCActe?.previousDataLinkState
      }))
    );
  }, [dataRMCActe, dataTableauRMCActe]);

  // Gestion du clic sur une colonne de type checkbox
  const [idActeSelectionnes, setIdActeSelectionnes] = useState<string[]>([]);

  const handleCaseACocherActeAfficheAvertissement = useCallback(
    (isChecked: boolean, data: any): boolean => {
      if (isChecked) {
        const alertes = dataAlertes?.filter((alerte: IAlerte) => {
          return alerte?.idActe === data?.idActe && Alerte.estDeTypeDescriptionSAGA(data.alerte);
        });
        return Array.isArray(alertes) && alertes.length > 0;
      }
      return false;
    },
    [dataAlertes]
  );

  const handleCaseACocherActeEstDesactive = useCallback(
    (data: ResultatRMCActe): boolean => {
      return estProjetActe(dataRequete, data);
    },
    [dataRequete]
  );

  useEffect(() => {
    setIdActeSelectionnes([]);
  }, [resetTableauActe]);

  const colonneCaseACocherActesParams: IColonneCaseACocherParams<ResultatRMCActe, string> = {
    identifiantsSelectionnes: idActeSelectionnes,
    setIdentifiantsSelectionnes: setIdActeSelectionnes,
    getIdentifiant: (data: ResultatRMCActe) => data.id
  };

  const conteneurCaseACocherProps: IConteneurElementPropsPartielles<ResultatRMCActe, string, TChangeEventSurHTMLInputElement> = {
    handleInteractionUtilisateur: onClickCheckboxCallBack,
    handleEstDesactive: handleCaseACocherActeEstDesactive,
    handleAfficheAvertissement: handleCaseACocherActeAfficheAvertissement,
    messageInfoBulleEstDesactive: "Pas de délivrance pour un projet d'acte non finalisé"
  };

  const columnHeaders = getColonnesTableauActes(typeRMC, colonneCaseACocherActesParams, conteneurCaseACocherProps, dataRequete?.type);

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
        noRows={getLigneTableauVide("Aucun acte n'a été trouvé.")}
        afficheBoutonsNavigationRapide={true}
      />
      {typeRMC === "Auto" && dataRequete?.type === TypeRequete.DELIVRANCE && (
        <CompteurElementsCoches nombreElements={idActeSelectionnes.length} />
      )}

      {etatFenetres?.map(
        (fenetreFicheActe: IFenetreFicheActe) =>
          fenetreFicheActe && (
            <FenetreFiche
              estConsultation={typeRMC === "Classique"}
              key={`fiche${fenetreFicheActe.idActe}${fenetreFicheActe.index.value}`}
              identifiant={fenetreFicheActe.idActe}
              categorie={TypeFiche.ACTE}
              datasFiches={fenetreFicheActe.datasFiches}
              numeroRequete={fenetreFicheActe.numeroRequete}
              onClose={closeFenetre}
              index={fenetreFicheActe.index}
              nbLignesTotales={dataTableauRMCActe.rowsNumberState ?? 0}
              getLignesSuivantesOuPrecedentes={getLignesSuivantesOuPrecedentesActe}
              nbLignesParAppel={nbLignesParAppel}
            />
          )
      )}
    </>
  );
};

function estProjetActe(requete: TRequete | undefined, acte: ResultatRMCActe): boolean {
  if (requete?.type === TypeRequete.DELIVRANCE) {
    const requeteDelivrance = requete as IRequeteDelivrance;
    if (SousTypeDelivrance.estRDDouRDCouRDDP(requeteDelivrance?.sousType) && typesFamilleProjetActe.includes(acte.familleRegistre)) {
      return true;
    }
  }
  return false;
}
