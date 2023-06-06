import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { officierALeDroitSurLePerimetre } from "@model/agent/IOfficier";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { TypeActeInscriptionSauvegarde } from "@model/requete/enum/TypeActeInscriptionSauvegarde";
import { FenetreFiche } from "@pages/fiche/FenetreFiche";
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { getLibelle, supprimeElement, UN, ZERO } from "@util/Utils";
import {
  CelluleBoutonMenu,
  ICelluleBoutonMenuProps
} from "@widget/tableau/TableauRece/colonneElements/boutonMenu/CelluleBoutonMenu";
import { IColonneBoutonMenuParams } from "@widget/tableau/TableauRece/colonneElements/boutonMenu/ColonneBoutonMenu";
import { IConteneurElementPropsPartielles } from "@widget/tableau/TableauRece/colonneElements/ConteneurElement";
import { TMouseEventSurHTMLButtonElement } from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import {
  NB_LIGNES_PAR_APPEL_PERSONNE,
  NB_LIGNES_PAR_PAGE_PERSONNE
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import React, { useState } from "react";
import {
  IFenetreFicheActe,
  IFenetreFicheActeInscription
} from "../common/IFenetreFicheActeInscription";
import {
  DataTableauRMCPersonne,
  IDataTableauRMCPersonne
} from "./IDataTableauRMCPersonne";
import "./scss/TableauRMCPersonne.scss";
import {
  getColonnesTableauRMCAutoPersonne,
  getIdentifiantPersonneOuActeInscription,
  getLigneTableauVide,
  getRolesPersonneEnFonctionNatureActeRequeteAsListeBoutonMenuItem
} from "./TableauRMCPersonneUtils";

interface TableauRMCPersonneProps {
  dataTableauRMCPersonne: IDataTableauRMCPersonne[];
  identifiantsPersonnesSelectionnees: string[];
  identifiantsActesInscriptionsSelectionnes: string[];
  onClickBoutonAjouterPersonneOuActeInscription: (
    event: TMouseEventSurHTMLButtonElement,
    data: IDataTableauRMCPersonne,
    cle?: string
  ) => void;
  natureActeRequete: NatureActeRequete;
  enChargement?: boolean;
}

export const TableauRMCPersonne: React.FC<TableauRMCPersonneProps> = props => {
  const [etatFenetres, setEtatFenetres] = useState<
    IFenetreFicheActeInscription[]
  >([]);

  function getBoutonMenuElement(data: IDataTableauRMCPersonne): JSX.Element {
    return (
      <CelluleBoutonMenu<IDataTableauRMCPersonne, string>
        {...(data.estDataPersonne
          ? boutonMenuAjouterPersonneProps
          : boutonMenuAjouterActeInscriptionProps)}
        className="colonne-bouton-menu"
      />
    );
  }

  const colonneBoutonAjouterPersonneOuActeInscriptionParams: IColonneBoutonMenuParams<
    IDataTableauRMCPersonne,
    string
  > = {
    getIdentifiant: getIdentifiantPersonneOuActeInscription,
    style: { width: "3rem" },
    getElement: getBoutonMenuElement
  };

  function handleEstDesactiveBoutonAjouterPersonneOuActeInscription(
    data: IDataTableauRMCPersonne
  ): boolean {
    const identifiants: string[] = [
      ...(data.estDataPersonne
        ? props.identifiantsPersonnesSelectionnees
        : props.identifiantsActesInscriptionsSelectionnes)
    ];
    return identifiants.includes(getIdentifiantPersonneOuActeInscription(data));
  }

  const conteneurBoutonAjouterPersonneProps: IConteneurElementPropsPartielles<
    IDataTableauRMCPersonne,
    string,
    TMouseEventSurHTMLButtonElement
  > = {
    handleInteractionUtilisateur:
      props.onClickBoutonAjouterPersonneOuActeInscription,
    handleEstDesactive: handleEstDesactiveBoutonAjouterPersonneOuActeInscription
  };

  const boutonMenuAjouterPersonneProps: ICelluleBoutonMenuProps = {
    boutonLibelle: getLibelle("+"),
    listeItems:
      getRolesPersonneEnFonctionNatureActeRequeteAsListeBoutonMenuItem(
        props.natureActeRequete
      ),
    titreBouton: getLibelle("Ajouter cette personne au projet"),
    anchorOrigin: { vertical: "top", horizontal: "left" },
    transformOrigin: { vertical: "top", horizontal: "right" },
    openOnMouseClick: true
  };

  const boutonMenuAjouterActeInscriptionProps: ICelluleBoutonMenuProps = {
    boutonLibelle: getLibelle("+"),
    listeItems: EnumWithComplete.getAllLibellesAsListeBoutonMenuItem(
      TypeActeInscriptionSauvegarde
    ),
    titreBouton: getLibelle("Ajouter cet acte ou inscription au projet"),
    anchorOrigin: { vertical: "top", horizontal: "left" },
    transformOrigin: { vertical: "top", horizontal: "right" },
    openOnMouseClick: true
  };

  const columnHeaders: TableauTypeColumn[] = getColonnesTableauRMCAutoPersonne(
    colonneBoutonAjouterPersonneOuActeInscriptionParams,
    conteneurBoutonAjouterPersonneProps,
    boutonMenuAjouterPersonneProps
  );

  const onClickOnLine = (
    idActeInscription: string,
    data: IDataTableauRMCPersonne[],
    index: number
  ) => {
    const dataLigne = data[index];
    if (
      dataLigne.typeFiche &&
      !dataLigne.estDataPersonne &&
      idActeInscription &&
      (DataTableauRMCPersonne.estActe(dataLigne) ||
        officierALeDroitSurLePerimetre(Droit.CONSULTER, Perimetre.MEAE))
    ) {
      const nouvelEtatFenetre: IFenetreFicheActeInscription = {
        index: { value: index },
        idActeInscription,
        datasFiches: [
          {
            identifiant: idActeInscription,
            categorie: dataLigne.typeFiche
          }
        ]
      };
      setEtatFenetres([...etatFenetres, nouvelEtatFenetre]);
    }
  };

  const closeFenetre = (idActeInscription: string, idx: number) => {
    const nouvelEtatFenetres = supprimeElement(
      etatFenetres,
      (etatFenetre: IFenetreFicheActe) =>
        etatFenetre.idActe === idActeInscription
    );
    setEtatFenetres(nouvelEtatFenetres);
  };

  return (
    <div className="resultatsRMCPersonne">
      {
        <TableauRece
          idKey={"idPersonneOuActeInscription"}
          columnHeaders={columnHeaders}
          dataState={props.dataTableauRMCPersonne}
          paramsTableau={{}}
          onClickOnLine={onClickOnLine}
          nbLignesParPage={NB_LIGNES_PAR_PAGE_PERSONNE}
          nbLignesParAppel={NB_LIGNES_PAR_APPEL_PERSONNE}
          noRows={getLigneTableauVide(
            getLibelle("Aucun résultat trouvé pour ces critères de recherche.")
          )}
          getRowClassName={getLigneClassName}
          stickyHeader={true}
          enChargement={props.enChargement}
        />
      }
      {etatFenetres && etatFenetres.length > ZERO && (
        <>
          {etatFenetres.map(
            (fenetreFicheActe: IFenetreFicheActeInscription) => {
              return (
                fenetreFicheActe && (
                  <FenetreFiche
                    estConsultation={true}
                    key={`fiche${fenetreFicheActe.idActeInscription}+${fenetreFicheActe.index}`}
                    identifiant={fenetreFicheActe.idActeInscription}
                    categorie={fenetreFicheActe.datasFiches[ZERO].categorie}
                    datasFiches={fenetreFicheActe.datasFiches}
                    onClose={closeFenetre}
                    index={fenetreFicheActe.index}
                    nbLignesTotales={UN}
                    nbLignesParAppel={UN}
                  />
                )
              );
            }
          )}
        </>
      )}
    </div>
  );
};

function getLigneClassName(data: IDataTableauRMCPersonne): string {
  return data.estDataPersonne
    ? "lignePersonne"
    : DataTableauRMCPersonne.estStatutAnnuleOuInactif(data)
    ? "ligneAnnuleInactif"
    : DataTableauRMCPersonne.estActe(data)
    ? "ligneActe"
    : "ligneRcRcaPacs";
}
