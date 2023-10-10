import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { Base64File, FILE_TYPES, PieceJointe } from "@util/FileUtils";
import messageManager from "@util/messageManager";
import { Option, Options } from "@util/Type";
import { getLibelle } from "@util/Utils";
import React from "react";
import { IconePoubelle } from "../../icones/IconePoubelle";
import {
  TableauSimple,
  TableauSimpleProps
} from "../../tableau/TableauSimple/TableauSimple";
import UploadFileField from "../champsSaisie/UploadFileField";
import "../scss/PiecesJointesForm.scss";

const FILE_MAX_SIZE_KB = 2000;

interface PiecesJointesProps {
  menuItem?: Options;
  piecesJointes: PieceJointe[];
  setPiecesJointes: (nouvellePiecejointe: PieceJointe[]) => void;
  maxPiecesJointes?: number;
  libelleBouton?: string;
  disabled?: boolean;
}

const MAX_PIECES_JOINTES = 3;
export const PiecesJointes: React.FC<PiecesJointesProps> = props => {
  function onFileChange(base64File: Base64File, type?: Option) {
    const pjTrouvee = props.piecesJointes.find(
      pj => pj.base64File.fileName === base64File.fileName
    );
    if (!pjTrouvee) {
      const nouvellePiecejointe: PieceJointe = { base64File, type };
      const nouvellesPiecesJointes = [
        ...props.piecesJointes,
        nouvellePiecejointe
      ];
      props.setPiecesJointes(nouvellesPiecesJointes);
    }
  }

  function supprimePieceJointe(libelle: string) {
    const nouvellesPiecesJointes = props.piecesJointes.filter(
      pj => pj.base64File.fileName !== libelle
    );
    props.setPiecesJointes(nouvellesPiecesJointes);
  }

  return (
    <div className="PiecesJointes">
      {/* Bouton Ajout Pieces Jointes */}
      <div className="BoutonPiecesJointes">
        <UploadFileField
          name="piecesJointes"
          libelleBouton={getLibelle(
            props.libelleBouton ? ` ${props.libelleBouton}` : " Ajouter"
          )}
          menuItems={props.menuItem}
          iconBouton={
            <AttachFileOutlinedIcon
              fontSize="small"
              className="iconeTrombone"
            />
          }
          hideInput={true}
          disabled={props.disabled}
          ariaLabel={getLibelle("Ajout pièce jointe")}
          title={getLibelle("Ajout d'une pièce jointe")}
          acceptFileTypes={FILE_TYPES}
          maxSizeKB={FILE_MAX_SIZE_KB}
          onFileChange={onFileChange}
          verificationAvantDOuvriLeMenu={() => {
            return verificationAvantDOuvriLeMenu(
              props.piecesJointes,
              props.maxPiecesJointes
            );
          }}
        />
      </div>
      {/* Bloc Tableau Pieces Jointes */}
      <div className="BlocPiecesJointes">
        {props.piecesJointes.length > 0 &&
          getTableauPiecesJointes(props.piecesJointes, supprimePieceJointe)}
      </div>
    </div>
  );
};

/** Construction du tableau des pièces jointes */
export function getTableauPiecesJointes(
  piecesJointes: PieceJointe[],
  supprimePieceJointe: (libelle: string) => void
): JSX.Element {
  const tableauSimpleProps: TableauSimpleProps = {
    entetes: piecesJointes[0].type
      ? [
          { libelle: getLibelle("Nom") },
          { libelle: getLibelle("Type") },
          { className: "EnteteActionPJ", libelle: getLibelle("Action") }
        ]
      : [
          { libelle: getLibelle("Nom") },
          { className: "EnteteActionPJ", libelle: getLibelle("Action") }
        ],
    lignes: piecesJointes.map(pj => ({
      key: pj.base64File.fileName,
      colonnes: pj.type
        ? [
            {
              contenu: getColonneNomPJ(pj)
            },
            {
              contenu: getColonneTypePJ(pj)
            },
            {
              className: "ActionPJ",
              onClick: () => {
                supprimePieceJointe(pj.base64File.fileName);
              },
              title: getLibelle("Supprimer"),
              contenu: getColonneSuppressionPJ(supprimePieceJointe, pj)
            }
          ]
        : [
            {
              contenu: getColonneNomPJ(pj)
            },
            {
              className: "ActionPJ",
              onClick: () => {
                supprimePieceJointe(pj.base64File.fileName);
              },
              title: getLibelle("Supprimer"),
              contenu: getColonneSuppressionPJ(supprimePieceJointe, pj)
            }
          ]
    }))
  };
  return <TableauSimple {...tableauSimpleProps} />;
}

function getColonneTypePJ(pj: PieceJointe): string | JSX.Element {
  return pj.type ? pj.type.libelle : "";
}

function getColonneSuppressionPJ(
  supprimePieceJointe: (libelle: string) => void,
  pj: PieceJointe
): JSX.Element {
  return (
    <IconePoubelle
      onClick={() => {
        supprimePieceJointe(pj.base64File.fileName);
      }}
      title={getLibelle("Supprimer")}
    />
  );
}

function getColonneNomPJ(pj: PieceJointe): JSX.Element {
  return (
    <>
      <InsertDriveFileOutlinedIcon fontSize="small" className="iconeFichier" />
      <span>{pj.base64File.fileName}</span>
    </>
  );
}

export function verificationAvantDOuvriLeMenu(
  piecesJointes: PieceJointe[],
  maxPiecesJointes = MAX_PIECES_JOINTES
) {
  let ouvrirLeMenu = true;
  if (piecesJointes.length >= maxPiecesJointes) {
    messageManager.showErrorAndClose(
      getLibelle("Le nombre maximal de pièces jointes est atteint")
    );
    ouvrirLeMenu = false;
  }
  return ouvrirLeMenu;
}
