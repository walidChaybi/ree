import { RECEContextData } from "@core/contexts/RECEContext";
import { officierALeDroitSurLePerimetre } from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { EStatutFiche } from "@model/etatcivil/enum/EStatutFiche";
import { FicheUtil, TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { TRequete } from "@model/requete/IRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import { supprimeElement } from "@util/Utils";
import { getLigneTableauVide } from "@widget/tableau/TableUtils";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { TChangeEventSurHTMLInputElement } from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FenetreFiche } from "../../../fiche/FenetreFiche";
import { IDataFicheProps, IIndex } from "../../../fiche/FichePage";
import { TypeRMC, goToLinkRMC } from "./RMCTableauCommun";
import { getColonnesTableauInscriptions } from "./RMCTableauInscriptionsParams";

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
  onClickCheckboxCallBack?: (event: TChangeEventSurHTMLInputElement, data: IResultatRMCInscription) => void;
  nbLignesParPage: number;
  nbLignesParAppel: number;
  // Données propre à une fiche Inscription pour sa pagination/navigation
  getLignesSuivantesOuPrecedentesInscription?: (ficheIdentifiant: string, lien: string) => void;
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
  const { utilisateurConnecte } = useContext(RECEContextData);
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
  const [etatFenetres, setEtatFenetres] = useState<IFenetreFicheInscription[]>([]);

  // Plage de fiche courante dans le tableau de résultat (suite à une RMC Inscription)
  const [datasFichesCourantes, setDatasFichesCourantes] = useState<IDataFicheProps[]>();

  function closeFenetre(idInscription: string, idx: number): void {
    const nouvelEtatFenetres = supprimeElement(
      etatFenetres,
      (etatFenetre: IFenetreFicheInscription) => etatFenetre.idInscription === idInscription
    );
    setEtatFenetres(nouvelEtatFenetres);
  }

  const onClickOnLine = (idInscription: string, data: any, index: number) => {
    if (officierALeDroitSurLePerimetre(Droit.CONSULTER, Perimetre.TOUS_REGISTRES, utilisateurConnecte)) {
      const etatFenetreTrouve = etatFenetres.find(etatFenetre => etatFenetre.idInscription === idInscription);
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
    }
  };

  useEffect(() => {
    if (dataRMCFicheInscription) {
      const etatFenetreTrouve = etatFenetres.find(etatFenetre => etatFenetre.idInscription === idFicheInscription);
      if (etatFenetreTrouve) {
        const datasFiches = dataRMCFicheInscription.map(data => ({
          identifiant: data.idInscription,
          categorie: getCategorieFiche(data.idInscription, dataRMCFicheInscription),
          lienSuivant: dataTableauRMCFicheInscription?.nextDataLinkState,
          lienPrecedent: dataTableauRMCFicheInscription?.previousDataLinkState
        }));
        etatFenetreTrouve.datasFiches = datasFiches;
        setEtatFenetres([...etatFenetres]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idFicheInscription, dataRMCFicheInscription, dataTableauRMCFicheInscription]);

  useEffect(() => {
    const datasFiches = dataRMCInscription.map(data => ({
      identifiant: data.idInscription,
      categorie: getCategorieFiche(data.idInscription, dataRMCInscription),
      lienSuivant: dataTableauRMCInscription?.nextDataLinkState,
      lienPrecedent: dataTableauRMCInscription?.previousDataLinkState
    }));
    setDatasFichesCourantes(datasFiches);
  }, [dataRMCInscription, dataTableauRMCInscription]);

  // Gestion du clic sur une colonne de type checkbox.
  const [idInscriptionSelectionnees, setIdInscriptionSelectionnees] = useState<string[]>([]);

  const handleCaseACocherInscriptionEstDesactive = useCallback(
    (data: IResultatRMCInscription): boolean => {
      if (dataRequete?.type === TypeRequete.DELIVRANCE) {
        const requeteDelivrance = dataRequete as IRequeteDelivrance;
        if (data?.statutInscription === EStatutFiche.INACTIF) {
          return true;
        }
        if (
          requeteDelivrance?.sousType?.nom === SousTypeDelivrance.RDC.nom ||
          requeteDelivrance?.sousType?.nom === SousTypeDelivrance.RDD.nom
        ) {
          return true;
        }
        return !DocumentDelivrance.estDocumentDelivranceValide(data?.categorie, requeteDelivrance?.documentDemande);
      }
      return false;
    },
    [dataRequete]
  );

  useEffect(() => {
    setIdInscriptionSelectionnees([]);
  }, [resetTableauInscription]);

  const columnHeaders = getColonnesTableauInscriptions(
    typeRMC,
    {
      identifiantsSelectionnes: idInscriptionSelectionnees,
      setIdentifiantsSelectionnes: setIdInscriptionSelectionnees,
      getIdentifiant: (data: IResultatRMCInscription) =>
        `${data.idInscription}-${data.nom}-${data.prenoms}-${data.dateNaissance}-${data.paysNaissance}-${data.statutInscription}`
    },
    {
      handleInteractionUtilisateur: onClickCheckboxCallBack,
      handleEstDesactive: handleCaseACocherInscriptionEstDesactive,
      messageInfoBulleEstDesactive: "Ce résultat ne correspond pas au document demandé par le requérant"
    },
    dataRequete?.type
  );

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
        noRows={getLigneTableauVide("Aucune inscription n'a été trouvée.")}
        nbLignesParPage={nbLignesParPage}
        nbLignesParAppel={nbLignesParAppel}
      />

      {typeRMC === "Auto" && dataRequete?.type === TypeRequete.DELIVRANCE && (
        <div className="ElementsCoches">{`${idInscriptionSelectionnees.length} élément(s) coché(s)`}</div>
      )}

      {etatFenetres && etatFenetres.length > 0 && (
        <>
          {etatFenetres.map((fenetreFicheInscription: IFenetreFicheInscription) => {
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
                  nbLignesTotales={dataTableauRMCInscription.rowsNumberState ?? 0}
                  getLignesSuivantesOuPrecedentes={getLignesSuivantesOuPrecedentesInscription}
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

function getCategorieFicheAPartirDatasFiches(id: string, datas: IDataFicheProps[]): TypeFiche {
  let categorie = "";
  datas.forEach(data => {
    if (data.categorie && data.identifiant === id) {
      categorie = data.categorie;
    }
  });
  return FicheUtil.getTypeFicheFromString(categorie);
}

function getCategorieFiche(id: string, data: IResultatRMCInscription[]): TypeFiche {
  let categorie = "";
  data.forEach(repertoire => {
    if (repertoire.categorie && repertoire.idInscription === id) {
      categorie = repertoire.categorie;
    }
  });
  return FicheUtil.getTypeFicheFromString(categorie);
}
