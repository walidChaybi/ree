import { RECEContextData } from "@core/contexts/RECEContext";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { ETypeRedactionActe } from "@model/etatcivil/enum/ETypeRedactionActe";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { FenetreFiche } from "@pages/fiche/FenetreFiche";
import { supprimeElement, UN, ZERO } from "@util/Utils";
import { CelluleBoutonMenu, ICelluleBoutonMenuProps } from "@widget/tableau/TableauRece/colonneElements/boutonMenu/CelluleBoutonMenu";
import { IColonneBoutonMenuParams } from "@widget/tableau/TableauRece/colonneElements/boutonMenu/ColonneBoutonMenu";
import { IConteneurElementPropsPartielles } from "@widget/tableau/TableauRece/colonneElements/ConteneurElement";
import { TMouseEventSurHTMLButtonElement } from "@widget/tableau/TableauRece/colonneElements/IColonneElementsParams";
import { NB_LIGNES_PAR_APPEL_PERSONNE, NB_LIGNES_PAR_PAGE_PERSONNE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import { getLigneTableauVide } from "@widget/tableau/TableUtils";
import React, { useContext, useState } from "react";
import { IFenetreFicheActeInscription } from "../common/IFenetreFicheActeInscription";
import { DataTableauRMCPersonne, IDataTableauRMCPersonne } from "./IDataTableauRMCPersonne";
import "./scss/TableauRMCPersonne.scss";
import {
  getColonnesTableauRMCAutoPersonne,
  getIdentifiantPersonneOuActeInscription,
  getRolesPersonneAsOptionsEnFonctionNatureActeRequete
} from "./TableauRMCPersonneUtils";

interface TableauRMCPersonneProps {
  typeRedactionActe: ETypeRedactionActe;
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
  const [etatFenetres, setEtatFenetres] = useState<IFenetreFicheActeInscription[]>([]);
  const { utilisateurConnecte } = useContext(RECEContextData);

  function getBoutonMenuElement(data: IDataTableauRMCPersonne): JSX.Element {
    return (
      <CelluleBoutonMenu<IDataTableauRMCPersonne, string>
        {...(data.estDataPersonne ? boutonMenuAjouterPersonneProps : boutonMenuAjouterActeInscriptionProps)}
        className="colonne-bouton-menu"
      />
    );
  }

  function afficheBoutonAjouterPersonneOuActeInscription(data: IDataTableauRMCPersonne): boolean {
    let afficheBouton = false;
    let identifiants: string[] = [];
    if (props.typeRedactionActe === ETypeRedactionActe.TRANSCRIT) {
      identifiants = [
        ...(data.estDataPersonne ? props.identifiantsPersonnesSelectionnees : props.identifiantsActesInscriptionsSelectionnes)
      ];
      afficheBouton = !identifiants.includes(getIdentifiantPersonneOuActeInscription(data));
    } else if (props.typeRedactionActe === ETypeRedactionActe.ETABLI && !data.estDataPersonne) {
      afficheBouton = !props.identifiantsActesInscriptionsSelectionnes.includes(getIdentifiantPersonneOuActeInscription(data));
    }
    return afficheBouton;
  }

  const colonneBoutonAjouterPersonneOuActeInscriptionParams: IColonneBoutonMenuParams<IDataTableauRMCPersonne, string> = {
    filtreAffichageElement: afficheBoutonAjouterPersonneOuActeInscription,
    getIdentifiant: getIdentifiantPersonneOuActeInscription,
    style: { width: "3rem" },
    getElement: getBoutonMenuElement
  };

  const conteneurBoutonAjouterPersonneOuActeInscriptionProps: IConteneurElementPropsPartielles<
    IDataTableauRMCPersonne,
    string,
    TMouseEventSurHTMLButtonElement
  > = {
    handleInteractionUtilisateur: props.onClickBoutonAjouterPersonneOuActeInscription
  };

  const boutonMenuAjouterPersonneProps: ICelluleBoutonMenuProps = {
    boutonLibelle: "+",
    options: getRolesPersonneAsOptionsEnFonctionNatureActeRequete(props.natureActeRequete),
    titreBouton: "Ajouter cette personne au projet",
    anchorOrigin: { vertical: "top", horizontal: "left" },
    transformOrigin: { vertical: "top", horizontal: "right" },
    openOnMouseClick: true
  };

  const boutonMenuAjouterActeInscriptionProps: ICelluleBoutonMenuProps = {
    boutonLibelle: "+",
    options: TypePieceJustificative.versOptions(TypeRequete.CREATION, props.typeRedactionActe),
    titreBouton: "Ajouter cet acte ou inscription au projet",
    anchorOrigin: { vertical: "top", horizontal: "left" },
    transformOrigin: { vertical: "top", horizontal: "right" },
    openOnMouseClick: true
  };

  const columnHeaders: TableauTypeColumn[] = getColonnesTableauRMCAutoPersonne(
    colonneBoutonAjouterPersonneOuActeInscriptionParams,
    conteneurBoutonAjouterPersonneOuActeInscriptionProps
  );

  const onClickOnLine = (idActeInscription: string, data: IDataTableauRMCPersonne[], index: number) => {
    const dataLigne = data[index];
    if (
      dataLigne.typeFiche &&
      !dataLigne.estDataPersonne &&
      idActeInscription &&
      (DataTableauRMCPersonne.estActe(dataLigne) ||
        utilisateurConnecte.estHabilitePour({ leDroit: Droit.CONSULTER, surLePerimetre: Perimetre.TOUS_REGISTRES }))
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
      (etatFenetre: IFenetreFicheActeInscription) => etatFenetre.idActeInscription === idActeInscription
    );
    setEtatFenetres(nouvelEtatFenetres);
  };

  return (
    <div className="resultatsRMCPersonne">
      <TableauRece
        idKey={"idPersonneOuActeInscription"}
        columnHeaders={columnHeaders}
        dataState={props.dataTableauRMCPersonne}
        paramsTableau={{}}
        onClickOnLine={onClickOnLine}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_PERSONNE}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_PERSONNE}
        messageAucunResultat={getLigneTableauVide("Aucun résultat trouvé pour ces critères de recherche.")}
        getRowClassName={getLigneClassName}
        stickyHeader={true}
        enChargement={props.enChargement}
      />

      {etatFenetres && etatFenetres.length > ZERO && (
        <>
          {etatFenetres.map((fenetreFicheActe: IFenetreFicheActeInscription) => {
            return (
              fenetreFicheActe && (
                <FenetreFiche
                  estConsultation={true}
                  key={`fiche${fenetreFicheActe.idActeInscription}+${fenetreFicheActe.index.value}`}
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
          })}
        </>
      )}
    </div>
  );
};

const getLigneClassName = (data: IDataTableauRMCPersonne): string => {
  switch (true) {
    case data.estDataPersonne:
      return "lignePersonne";
    case DataTableauRMCPersonne.estStatutAnnuleOuInactif(data):
      return "ligneAnnuleInactif";
    case DataTableauRMCPersonne.estActe(data):
      return "ligneActe";
    default:
      return "ligneRcRcaPacs";
  }
};
