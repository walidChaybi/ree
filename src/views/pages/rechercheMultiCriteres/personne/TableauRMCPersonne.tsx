import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { officierALeDroitSurLePerimetre } from "@model/agent/IOfficier";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { RolePersonneSauvegardee } from "@model/requete/enum/RolePersonneSauvegardee";
import { FenetreFiche } from "@pages/fiche/FenetreFiche";
import { getLibelle, supprimeElement, UN, ZERO } from "@util/Utils";
import { ICelluleBoutonMenuProps } from "@widget/tableau/TableauRece/colonneElements/boutonMenu/CelluleBoutonMenu";
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
  DataTableauRMCPersonne,
  IDataTableauRMCPersonne
} from "../../requeteCreation/commun/composants/ongletRMCPersonne/IDataTableauRMCPersonne";
import {
  IFenetreFicheActe,
  IFenetreFicheActeInscription
} from "../common/IFenetreFicheActeInscription";
import "./scss/TableauRMCPersonne.scss";
import {
  getColonnesTableauRMCAutoPersonne,
  getLigneTableauVide
} from "./TableauRMCPersonneUtils";

interface TableauRMCPersonneProps {
  dataTableauRMCPersonne: IDataTableauRMCPersonne[];
  identifiantsPersonnesSelectionnees: string[];
  getIdentifiantPersonne: (data: IDataTableauRMCPersonne) => string;
  onClickBoutonAjouterPersonne: (
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

  function getLigneClassName(data: IDataTableauRMCPersonne): string {
    return DataTableauRMCPersonne.estPersonne(data)
      ? "lignePersonne"
      : DataTableauRMCPersonne.estStatutAnnuleOuInactif(data)
      ? "ligneAnnuleInactif"
      : DataTableauRMCPersonne.estActe(data)
      ? "ligneActe"
      : "ligneRcRcaPacs";
  }

  const colonneBoutonAjouterPersonneParams: IColonneBoutonMenuParams<
    IDataTableauRMCPersonne,
    string
  > = {
    getIdentifiant: props.getIdentifiantPersonne,
    filtreAffichageElement: (data: IDataTableauRMCPersonne) =>
      data.idPersonne !== ""
  };

  const conteneurBoutonAjouterPersonneProps: IConteneurElementPropsPartielles<
    IDataTableauRMCPersonne,
    string,
    TMouseEventSurHTMLButtonElement
  > = {
    handleInteractionUtilisateur: props.onClickBoutonAjouterPersonne,
    handleEstDesactive: (data: IDataTableauRMCPersonne) =>
      props.identifiantsPersonnesSelectionnees.includes(
        props.getIdentifiantPersonne(data)
      )
  };

  const boutonMenuAjouterPersonneProps: ICelluleBoutonMenuProps = {
    boutonLibelle: getLibelle("+"),
    listeItems:
      RolePersonneSauvegardee.getRolesPersonnesSauvegardeesEnFonctionNatureActeRequete(
        props.natureActeRequete
      ).map(roleCourant => ({
        key: roleCourant.nom,
        libelle: roleCourant.libelle
      })),
    titreBouton: getLibelle("Ajouter cette personne au projet"),
    anchorOrigin: { vertical: "top", horizontal: "left" },
    transformOrigin: { vertical: "top", horizontal: "right" },
    openOnMouseClick: true
  };

  const columnHeaders: TableauTypeColumn[] = getColonnesTableauRMCAutoPersonne(
    colonneBoutonAjouterPersonneParams,
    conteneurBoutonAjouterPersonneProps,
    boutonMenuAjouterPersonneProps
  );

  const onClickOnLine = (
    idActeInscription: string,
    data: IDataTableauRMCPersonne[],
    index: number
  ) => {
    const estActeDuPerimetreAgent = () => {
      return (
        idActeInscription &&
        data[index].nature &&
        !data[index].categorieRepertoire
      );
    };
    const estInscriptionDuPerimetreMEAE = () => {
      return (
        idActeInscription &&
        officierALeDroitSurLePerimetre(Droit.CONSULTER, Perimetre.MEAE)
      );
    };

    if (estActeDuPerimetreAgent() || estInscriptionDuPerimetreMEAE()) {
      const nouvelEtatFenetre: IFenetreFicheActeInscription = {
        index: { value: index },
        idActeInscription,
        datasFiches: [
          {
            identifiant: idActeInscription,
            categorie: data[index].categorieRepertoire || TypeFiche.ACTE
          }
        ]
      };
      setEtatFenetres([...etatFenetres, nouvelEtatFenetre]);
    }
  };

  const closeFenetre = (idActeOuInscription: string, idx: number) => {
    const nouvelEtatFenetres = supprimeElement(
      etatFenetres,
      (etatFenetre: IFenetreFicheActe) =>
        etatFenetre.idActe === idActeOuInscription
    );
    setEtatFenetres(nouvelEtatFenetres);
  };

  return (
    <div className="resultatsRMCPersonne">
      {
        <TableauRece
          idKey={"idActeOuInscription"}
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
