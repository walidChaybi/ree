import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { ICelluleFontAwesomeIconeProps } from "@widget/tableau/TableauRece/colonneElements/fontAwesomeIcon/CelluleFontAwesomeIcone";
import {
  getColonneFontAwesomeIcone,
  IColonneFontAwesomeIcone
} from "@widget/tableau/TableauRece/colonneElements/fontAwesomeIcon/ColonneFontAwesomeIcone";
import {
  NB_LIGNES_PAR_APPEL_PERSONNE,
  NB_LIGNES_PAR_PAGE_PERSONNE
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import { getLigneTableauVide } from "@widget/tableau/TableUtils";
import React, { useState } from "react";
import ModalBulletinIdentification from "./ModalBulletinIdentification";
import { IDataBulletinIdentificationResultat } from "./ModalBulletinIdentificationApiHook";
import "./scss/TableauSuiviDossier.scss";
import {
  ILigneTableauSuiviDossier,
  ITableauSuiviDossierParams,
  useTableauSuiviDossierHook
} from "./TableauSuiviDossierHook";
import { getColonnesTableauSuiviDossier } from "./TableauSuiviDossierUtils";

const TableauSuiviDossier: React.FC<ITableauSuiviDossierParams> = props => {
  const [idBIAAfficher, setIdBIAAfficher] = useState<string>("");
  const [isModalOuverte, setIsModalOuverte] = useState<boolean>(false);
  const [dataFromRequete, setDataFromRequete] =
    useState<IDataBulletinIdentificationResultat>();

  const { dataTableau } = useTableauSuiviDossierHook(props.requete.titulaires);

  // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  // TODO: GESTION SUPPRESSION DES PROJETS D ACTES ET AJOUT DES ICONES POUBELLES (RETIRER OPACITY: 0)

  const colonneIconeRetirerProjetActeParams: IColonneFontAwesomeIcone<
    ILigneTableauSuiviDossier,
    string
  > = {
    getIdentifiant: data => data.idActe,
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
    if (!data[idxGlobal].evenement) {
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
        idKey={"idActe"}
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
