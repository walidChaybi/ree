import { TypeFamille } from "@model/etatcivil/enum/TypeFamille";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { Alerte, IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { TRequete } from "@model/requete/IRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IFenetreFicheActe } from "@pages/rechercheMultiCriteres/common/IFenetreFicheActeInscription";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import { getValeurOuVide, supprimeElement } from "@util/Utils";
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
  dataRMCActe: IResultatRMCActe[];
  dataTableauRMCActe: IParamsTableau;
  setRangeActe?: (range: string) => void;
  resetTableauActe?: boolean;
  onClickCheckboxCallBack?: (event: TChangeEventSurHTMLInputElement, data: IResultatRMCActe) => void;
  nbLignesParPage: number;
  nbLignesParAppel: number;
  // Données propre à une fiche acte pour sa pagination/navigation
  getLignesSuivantesOuPrecedentesActe?: (ficheIdentifiant: string, lien: string) => void;
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
    setDatasFichesCourantes(datasFiches);
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
    (data: IResultatRMCActe): boolean => {
      return estProjetActe(dataRequete, data);
    },
    [dataRequete]
  );

  useEffect(() => {
    setIdActeSelectionnes([]);
  }, [resetTableauActe]);

  const colonneCaseACocherActesParams: IColonneCaseACocherParams<IResultatRMCActe, string> = {
    identifiantsSelectionnes: idActeSelectionnes,
    setIdentifiantsSelectionnes: setIdActeSelectionnes,
    getIdentifiant: (data: IResultatRMCActe) => data.idActe
  };

  const conteneurCaseACocherProps: IConteneurElementPropsPartielles<IResultatRMCActe, string, TChangeEventSurHTMLInputElement> = {
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
                  getLignesSuivantesOuPrecedentes={getLignesSuivantesOuPrecedentesActe}
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

function estProjetActe(dataRequete: TRequete | undefined, data: IResultatRMCActe): boolean {
  if (dataRequete?.type === TypeRequete.DELIVRANCE) {
    const requeteDelivrance = dataRequete as IRequeteDelivrance;
    if (SousTypeDelivrance.estRDDouRDCouRDDP(requeteDelivrance?.sousType) && TypeFamille.estTypeFamilleProjetActe(data.familleRegistre)) {
      return true;
    }
  }
  return false;
}
