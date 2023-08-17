import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { NatureProjetEtablissement } from "@model/requete/enum/NatureProjetEtablissement";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET } from "@router/ReceUrls";
import { getUrlPrecedente, replaceUrl } from "@util/route/UrlUtil";
import { getLigneTableauVide } from "@widget/tableau/TableUtils";
import {
  NB_LIGNES_PAR_APPEL_PERSONNE,
  NB_LIGNES_PAR_PAGE_PERSONNE
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import { ICelluleFontAwesomeIconeProps } from "@widget/tableau/TableauRece/colonneElements/fontAwesomeIcon/CelluleFontAwesomeIcone";
import {
  IColonneFontAwesomeIcone,
  getColonneFontAwesomeIcone
} from "@widget/tableau/TableauRece/colonneElements/fontAwesomeIcon/ColonneFontAwesomeIcone";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ModalBulletinIdentification from "./ModalBulletinIdentification";
import { IDataBulletinIdentificationResultat } from "./ModalBulletinIdentificationApiHook";
import {
  ILigneTableauSuiviDossier,
  ITableauSuiviDossierParams,
  useTableauSuiviDossierHook
} from "./TableauSuiviDossierHook";
import { getColonnesTableauSuiviDossier } from "./TableauSuiviDossierUtils";
import "./scss/TableauSuiviDossier.scss";

const TableauSuiviDossier: React.FC<ITableauSuiviDossierParams> = props => {
  const [idBIAAfficher, setIdBIAAfficher] = useState<string>("");
  const [isModalOuverte, setIsModalOuverte] = useState<boolean>(false);
  const [dataFromRequete, setDataFromRequete] =
    useState<IDataBulletinIdentificationResultat>();

  const history = useHistory();

  const { dataTableau } = useTableauSuiviDossierHook(props.requete.titulaires);

  // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  // TODO: GESTION SUPPRESSION DES PROJETS D ACTES ET AJOUT DES ICONES POUBELLES (RETIRER OPACITY: 0)

  const colonneIconeRetirerProjetActeParams: IColonneFontAwesomeIcone<
    ILigneTableauSuiviDossier,
    string
  > = {
    getIdentifiant: data => data.idLienEtatCivil,
    style: {
      width: "3rem",
      opacity: 0
    }
  };
  const iconeRetirerProjetActeProps: ICelluleFontAwesomeIconeProps = {
    icon: faTrashAlt,
    size: "lg",
    className: "IconePoubelle"
  };
  const columnHeaderTableauSuiviDossier: TableauTypeColumn[] = [
    ...getColonnesTableauSuiviDossier(),
    getColonneFontAwesomeIcone(
      colonneIconeRetirerProjetActeParams,
      iconeRetirerProjetActeProps
    )
  ];

  // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  function onClickOnLine(
    id: string,
    data: ILigneTableauSuiviDossier[],
    idxGlobal: number
  ) {
    const ligneSelectionnee = data[idxGlobal];
    if (!ligneSelectionnee.evenement) {
      const titulaire = props.requete.titulaires?.find(
        titulaireCourant => titulaireCourant.id === data[idxGlobal].id
      );

      setDataFromRequete({
        nom: data[idxGlobal].nom,
        prenoms: data[idxGlobal].prenoms,
        sexe: Sexe.getEnumFor(titulaire?.sexe || "").libelle,
        dateNaissance: titulaire?.dateNaissanceFormatee || "",
        lieuNaissance: titulaire?.lieuNaissanceFormate || ""
      });
      setIdBIAAfficher(id);
      setIsModalOuverte(true);
    } else if (
      NatureProjetEtablissement.estNaissance(
        NatureProjetEtablissement.getEnumFromLibelle(
          ligneSelectionnee?.evenement || ""
        )
      )
    ) {
      const ligneTitulaire = data.find(
        ligne => ligne.id === ligneSelectionnee.id
      );
      if (
        QualiteFamille.estPostulant(
          QualiteFamille.getEnumFromLibelle(ligneTitulaire?.qualite || "")
        )
      ) {
        replaceUrl(
          history,
          `${getUrlPrecedente(
            history.location.pathname
          )}/${PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET}/${
            props.requete.id
          }/${id}`
        );
      }
    }
  }

  function onClose() {
    setIsModalOuverte(false);
    setIdBIAAfficher("");
    setDataFromRequete(undefined);
  }

  return (
    <div className="TableauSuiviDossier">
      <TableauRece
        idKey={"idLienEtatCivil"}
        columnHeaders={columnHeaderTableauSuiviDossier}
        dataState={dataTableau}
        onClickOnLine={onClickOnLine}
        paramsTableau={{}}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_PERSONNE}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_PERSONNE}
        getRowClassName={getLigneClassName}
        noRows={getLigneTableauVide("Aucun projet d'acte n'a été trouvé.")}
      />
      <ModalBulletinIdentification
        dataFromRequete={
          dataFromRequete || ({} as IDataBulletinIdentificationResultat)
        }
        open={isModalOuverte}
        onClose={onClose}
        idActe={idBIAAfficher}
      />
    </div>
  );
};

export default TableauSuiviDossier;

function getLigneClassName(data: ILigneTableauSuiviDossier): string {
  return Boolean(data.prenoms) ? "lignePersonne" : "ligneProjetActe";
}
