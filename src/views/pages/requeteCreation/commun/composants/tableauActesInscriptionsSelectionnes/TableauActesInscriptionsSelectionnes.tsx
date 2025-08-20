import { NB_LIGNES_PAR_PAGE_PERSONNE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Tableau from "../../../../../../composants/commun/tableau/Tableau";
import { IDataTableauActeInscriptionSelectionne } from "./IDataTableauActeInscriptionSelectionne";

interface ITableauActesInscriptionsSelectionnesProps {
  dataActesInscriptionsSelectionnes: IDataTableauActeInscriptionSelectionne[];
  onClickBoutonRetirerActeInscription: (data: IDataTableauActeInscriptionSelectionne) => void;
}

export const EN_TETES_ACTE_INSCRIPTION_SELECTIONNE = [
  {
    cle: "nom",
    libelle: "Nom"
  },
  {
    cle: "autresNoms",
    libelle: "Autres noms"
  },
  {
    cle: "prenoms",
    libelle: "Prénoms"
  },
  {
    cle: "sexe",
    libelle: "Sexe"
  },
  {
    cle: "dateNaissance",
    libelle: "Date de naissance"
  },
  {
    cle: "lieuNaissance",
    libelle: "Lieu de naissance"
  },
  {
    cle: "nature",
    libelle: "Nature"
  },
  {
    cle: "reference",
    libelle: "Référence"
  },
  {
    cle: "typePJ",
    libelle: "Type PJ"
  },
  {
    cle: "actions",
    libelle: ""
  }
];

export const TableauActesInscriptionsSelectionnes: React.FC<ITableauActesInscriptionsSelectionnesProps> = props => {
  const [pageActuelle, setPageActuelle] = useState(0);

  const getIconeSuppression = (data: IDataTableauActeInscriptionSelectionne) => (
    <FaTrashAlt
      className="text-xl"
      title="Retirer cet acte ou inscription du projet"
      aria-label="Retirer cet acte ou inscription du projet"
      onClick={() => props.onClickBoutonRetirerActeInscription(data)}
    />
  );

  return (
    <div className="ActesInscriptionsSelectionnesProjet">
      <div className="sousTitre">
        <span>{"Actes et inscriptions sélectionnés pour le projet"}</span>
      </div>
      <Tableau
        enTetes={EN_TETES_ACTE_INSCRIPTION_SELECTIONNE}
        lignes={props.dataActesInscriptionsSelectionnes.map(ligne => ({
          cle: ligne.idPersonne,
          nom: ligne.nom,
          autresNoms: ligne.autresNoms,
          prenoms: ligne.prenoms,
          sexe: ligne.sexe,
          dateNaissance: ligne.dateNaissance,
          lieuNaissance: ligne.lieuNaissance,
          nature: ligne.nature,
          reference: ligne.reference,
          typePJ: ligne.typePJ,
          actions: getIconeSuppression(ligne)
        }))}
        messageAucuneLigne="Aucun acte ou inscription sélectionné pour le projet."
        parametresPagination={{
          pageActuelle: pageActuelle,
          lignesParPage: NB_LIGNES_PAR_PAGE_PERSONNE,
          totalLignes: props.dataActesInscriptionsSelectionnes.length,
          onChangePage: () => {
            setPageActuelle(pageActuelle + 1);
          }
        }}
      />
    </div>
  );
};
