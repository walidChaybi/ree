import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import { connect } from "formik";
import React, { useEffect } from "react";
import { TypePieceJustificative } from "../../../../../model/requete/v2/enum/TypePieceJustificative";
import {
  Base64File,
  ExtensionDocumentTypeMime,
  PieceJointe
} from "../../../util/FileUtils";
import { Option, Options } from "../../../util/Type";
import { IconePoubelle } from "../../icones/IconePoubelle";
import {
  TableauSimple,
  TableauSimpleProps
} from "../../tableau/TableauSimple/TableauSimple";
import { getLibelle } from "../../Text";
import UploadFileField from "../champsSaisie/UploadFileField";
import "../scss/PiecesJointesForm.scss";
import { SousFormulaire } from "../SousFormulaire";
import { SubFormProps } from "../utils/FormUtil";

const FILE_TYPES: ExtensionDocumentTypeMime[] = [
  { extension: "png", mimeType: "image/png" },
  { extension: "pdf", mimeType: "application/pdf" },
  { extension: "jpg", mimeType: "image/jpeg" },
  { extension: "jpeg", mimeType: "image/jpeg" }
];

const FILE_MAX_SIZE_KB = 2000;

const PiecesJointesForm: React.FC<SubFormProps> = props => {
  const [menuItemsState, setMenuItemsState] = React.useState<Options>([]);

  const piecesJointes: PieceJointe[] =
    props.formik.getFieldProps(props.nom).value || [];

  function onFileChange(base64File: Base64File, type?: Option) {
    const pjTrouvee = piecesJointes.find(
      pj => pj.base64File.fileName === base64File.fileName
    );
    if (!pjTrouvee) {
      const nouvellePiecejointe: PieceJointe = { base64File, type };
      const nouvellesPiecesJointes = [...piecesJointes, nouvellePiecejointe];
      props.formik.setFieldValue(props.nom, nouvellesPiecesJointes);
    }
  }

  function supprimePieceJointe(libelle: string) {
    const nouvellesPiecesJointes = piecesJointes.filter(
      pj => pj.base64File.fileName !== libelle
    );
    props.formik.setFieldValue(props.nom, nouvellesPiecesJointes);
  }

  useEffect(() => {
    getPiecesJustificatives();
  }, []);

  const getPiecesJustificatives = async () => {
    const piecesJustificatives = TypePieceJustificative.getAllEnumsAsOptions();
    setMenuItemsState(piecesJustificatives);
  };

  return (
    <SousFormulaire titre={props.titre}>
      <div className="PiecesJointes">
        {/* Bouton Ajout Pieces Jointes */}
        <div className="BoutonPiecesJointes">
          <UploadFileField
            name="piecesJointes"
            libelleBouton={getLibelle(" Ajouter")}
            menuItems={menuItemsState}
            iconBouton={
              <AttachFileOutlinedIcon
                fontSize="small"
                className="iconeTrombone"
              />
            }
            hideInput={true}
            ariaLabel={getLibelle("Ajout pièce jointe")}
            title={getLibelle("Ajout d'une pièce jointe")}
            acceptFileTypes={FILE_TYPES}
            maxSizeKB={FILE_MAX_SIZE_KB}
            onFileChange={onFileChange}
          />
        </div>
        {/* Bloc Tableau Pieces Jointes */}
        <div className="BlocPiecesJointes">
          {piecesJointes.length > 0 &&
            getTableauPiecesJointes(piecesJointes, supprimePieceJointe)}
        </div>
      </div>
    </SousFormulaire>
  );
};

/** Construction du tableau des pièces jointes */
function getTableauPiecesJointes(
  piecesJointes: PieceJointe[],
  supprimePieceJointe: (libelle: string) => void
): JSX.Element {
  const tableauSimpleProps: TableauSimpleProps = {
    entetes: [
      { libelle: getLibelle("Nom") },
      { libelle: getLibelle("Type") },
      { className: "EnteteActionPJ", libelle: getLibelle("Action") }
    ],
    lignes: piecesJointes.map(pj => ({
      key: pj.base64File.fileName,
      colonnes: [
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
    }))
  };
  return <TableauSimple {...tableauSimpleProps} />;
}

function getColonneTypePJ(pj: PieceJointe): string | JSX.Element {
  return pj.type ? pj.type.str : "";
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

export default connect(PiecesJointesForm);
