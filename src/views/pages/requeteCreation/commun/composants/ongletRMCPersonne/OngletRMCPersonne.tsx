import { IRMCPersonneResultat } from "@hook/rmcAuto/IRMCPersonneResultat";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { RolePersonneSauvegardee } from "@model/requete/enum/RolePersonneSauvegardee";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { TableauRMCPersonne } from "@pages/rechercheMultiCriteres/personne/TableauRMCPersonne";
import {
  getLibelleMenuItemPersonne,
  mapDataTableauRMCPersonne
} from "@pages/rechercheMultiCriteres/personne/TableauRMCPersonneUtils";
import { IDataTableauRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/IDataTableauRMCPersonne";
import { getLibelle } from "@util/Utils";
import { BoutonMenu, IBoutonMenuItem } from "@widget/boutonMenu/BoutonMenu";
import {
  TMouseEventSurHTMLButtonElement,
  TMouseEventSurSVGSVGElement
} from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import React from "react";
import { IDataTableauPersonneSelectionnee } from "./IDataTableauPersonneSauvegardee";
import "./scss/OngletRMCPersonne.scss";
import { TableauPersonnesSelectionnees } from "./TableauPersonnesSauvegardees";

interface OngletRMCPersonneProps {
  sousTypeRequete: SousTypeCreation;
  natureActeRequete: NatureActeRequete;
  resultatRMCPersonne: IRMCPersonneResultat[];
  listeTitulaires?: ITitulaireRequeteCreation[];
  dataPersonnesSelectionnees: IDataTableauPersonneSelectionnee[];
  setDataPersonnesSelectionnees: React.Dispatch<
    React.SetStateAction<IDataTableauPersonneSelectionnee[]>
  >;
  handleClickMenuItem: (idTitulaire: string) => void;
}

export const OngletRMCPersonne: React.FC<OngletRMCPersonneProps> = props => {
  function getIdentifiantPersonne(
    data: IDataTableauPersonneSelectionnee | IDataTableauRMCPersonne
  ): string {
    return data.idPersonne;
  }

  function onClickBoutonAjouterPersonne(
    event: TMouseEventSurHTMLButtonElement,
    data: IDataTableauRMCPersonne,
    cle?: string | undefined
  ): void {
    if (
      cle &&
      !identifiantEstDejaSelectionne(
        props.dataPersonnesSelectionnees,
        data.idPersonne
      )
    ) {
      const role: RolePersonneSauvegardee | undefined =
        RolePersonneSauvegardee.getEnumFor(
          RolePersonneSauvegardee.getKeyForNom(cle)
        );
      props.setDataPersonnesSelectionnees(
        [
          ...props.dataPersonnesSelectionnees,
          { ...data, role: role.libelle }
        ].sort(triDataTableauPersonneSelectionneeSurNomPrenom)
      );
    }
  }

  function onClickBoutonRetirerPersonne(
    event: TMouseEventSurSVGSVGElement,
    data: IDataTableauPersonneSelectionnee
  ): void {
    props.setDataPersonnesSelectionnees(
      props.dataPersonnesSelectionnees.filter(
        personne => personne.idPersonne !== getIdentifiantPersonne(data)
      )
    );
  }

  function getListeItemsPersonnes(): IBoutonMenuItem[] {
    return props.listeTitulaires
      ? props.listeTitulaires.map(titulaire => ({
          key: titulaire.id,
          libelle: getLibelleMenuItemPersonne(titulaire, props.sousTypeRequete)
        }))
      : [];
  }

  return (
    <>
      <TableauRMCPersonne
        dataTableauRMCPersonne={mapDataTableauRMCPersonne(
          props.resultatRMCPersonne
        )}
        identifiantsPersonnesSelectionnees={props.dataPersonnesSelectionnees.map(
          personne => personne.idPersonne
        )}
        getIdentifiantPersonne={getIdentifiantPersonne}
        natureActeRequete={props.natureActeRequete}
        onClickBoutonAjouterPersonne={onClickBoutonAjouterPersonne}
      />
      <BoutonMenu
        boutonLibelle={getLibelle("Rechercher sur une personne de la requête")}
        listeItems={getListeItemsPersonnes()}
        onClickMenuItem={e => props.handleClickMenuItem(e)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
      <TableauPersonnesSelectionnees
        dataPersonnesSelectionnees={props.dataPersonnesSelectionnees}
        getIdentifiantPersonne={getIdentifiantPersonne}
        onClickBoutonRetirerPersonne={onClickBoutonRetirerPersonne}
      />
    </>
  );
};

function triDataTableauPersonneSelectionneeSurNomPrenom(
  personne1: IDataTableauPersonneSelectionnee,
  personne2: IDataTableauPersonneSelectionnee
): number {
  let compareNom = 0;
  let comparePrenoms = 0;
  if (personne1.nom && personne2.nom) {
    compareNom = personne1.nom.localeCompare(personne2.nom);
  }
  if (personne1.prenoms && personne2.prenoms) {
    comparePrenoms = personne1.prenoms.localeCompare(personne2.prenoms);
  }
  return compareNom || comparePrenoms;
} 

function identifiantEstDejaSelectionne(
  dataPersonnesSelectionnees: IDataTableauPersonneSelectionnee[],
  idPersonne: string
): boolean {
  return dataPersonnesSelectionnees.some(
    personneSelectionnee => personneSelectionnee.idPersonne === idPersonne
  );
}
