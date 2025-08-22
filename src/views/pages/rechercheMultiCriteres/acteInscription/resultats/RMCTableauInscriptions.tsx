import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { ETypeFiche } from "@model/etatcivil/enum/ETypeFiche";
import { TRequete } from "@model/requete/IRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import { supprimeElement } from "@util/Utils";
import { getLigneTableauVide } from "@widget/tableau/TableUtils";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { TChangeEventSurHTMLInputElement } from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { RECEContextData } from "../../../../../contexts/RECEContextProvider";
import { FenetreFiche } from "../../../fiche/FenetreFiche";
import { IDataFicheProps, IIndex } from "../../../fiche/FichePage";
import { TypeRMC } from "./RMCTableauCommun";
import { getColonnesTableauInscriptions } from "./RMCTableauInscriptionsParams";

interface IFenetreFicheInscription {
  idInscription: string;
  datasFiches: IDataFicheProps[];
  index: IIndex;
}

interface RMCResultatInscriptionProps {
  typeRMC: TypeRMC;
  dataRequete?: TRequete;
  dataRMCInscription: TResultatRMCInscription[];
  dataTableauRMCInscription: IParamsTableau;
  resetTableauInscription?: boolean;
  onClickCheckboxCallBack?: (event: TChangeEventSurHTMLInputElement, data: TResultatRMCInscription) => void;
  nbLignesParPage: number;
  nbLignesParAppel: number;
}

export const RMCTableauInscriptions: React.FC<RMCResultatInscriptionProps> = ({
  typeRMC,
  dataRequete,
  dataRMCInscription,
  dataTableauRMCInscription,
  resetTableauInscription,
  onClickCheckboxCallBack,
  nbLignesParPage,
  nbLignesParAppel
}) => {
  const { utilisateurConnecte } = useContext(RECEContextData);

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
    if (utilisateurConnecte.estHabilitePour({ leDroit: Droit.CONSULTER, surLePerimetre: Perimetre.TOUS_REGISTRES })) {
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
    const datasFiches: IDataFicheProps[] = dataRMCInscription.map(inscription => ({
      identifiant: inscription.id,
      categorie: ETypeFiche[inscription.categorie]
    }));
    setDatasFichesCourantes(datasFiches);
  }, [dataRMCInscription, dataTableauRMCInscription]);

  // Gestion du clic sur une colonne de type checkbox.
  const [idInscriptionSelectionnees, setIdInscriptionSelectionnees] = useState<string[]>([]);

  const handleCaseACocherInscriptionEstDesactive = useCallback(
    (data: TResultatRMCInscription): boolean => {
      if (dataRequete?.type === TypeRequete.DELIVRANCE) {
        const requeteDelivrance = dataRequete as IRequeteDelivrance;
        if (data.statut === "INACTIF") {
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
      getIdentifiant: (inscription: TResultatRMCInscription) =>
        `${inscription.id}-${inscription.personne.nom}-${inscription.personne.prenoms}-${inscription.personne.dateNaissance}-${inscription.personne.paysNaissance}-${inscription.statut}`
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
        idKey={"id"}
        onClickOnLine={onClickOnLine}
        columnHeaders={columnHeaders}
        dataState={dataRMCInscription}
        paramsTableau={dataTableauRMCInscription}
        messageAucunResultat={getLigneTableauVide("Aucune inscription n'a été trouvée.")}
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
                  key={`fiche${fenetreFicheInscription.idInscription}${fenetreFicheInscription.index.value}`}
                  identifiant={fenetreFicheInscription.idInscription}
                  onClose={closeFenetre}
                  datasFiches={fenetreFicheInscription.datasFiches}
                  index={fenetreFicheInscription.index}
                  nbLignesTotales={dataTableauRMCInscription.rowsNumberState ?? 0}
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
