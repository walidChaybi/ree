import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Base64File, FILE_TYPES } from "@util/FileUtils";
import { Option, Options } from "@util/Type";
import { DIX_MILLE, getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import UploadFileField from "@widget/formulaire/champsSaisie/UploadFileField";
import { getTableauPiecesJointes } from "@widget/formulaire/piecesJointes/PiecesJointes";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import { useEffect, useState } from "react";

interface ContenuModalProps {
  listeCategoriePJ: Options;
  onClose: () => void;
}
type ContenuModalAjoutPieceJustificativeProps = SubFormProps &
  ContenuModalProps;

const ContenuModalAjoutPieceJustificative: React.FC<
  ContenuModalAjoutPieceJustificativeProps
> = props => {
  const [formulaireEstChange, setFormulaireEstChange] =
    useState<boolean>(false);

  useEffect(() => {
    if (props.formik.values.categoriePJ && props.formik.values.file) {
      setFormulaireEstChange(true);
    }
  }, [props.formik.values.categoriePJ, props.formik.values.file]);

  function onFileChange(
    base64File: Base64File,
    type?: Option | undefined
  ): void {
    props.formik.setFieldValue("file", { base64File, type });
  }

  function supprimePieceJointe() {
    props.formik.setFieldValue("file", undefined);
  }

  async function onSubmitForm() {
    await props.formik.submitForm();
    setFormulaireEstChange(false);
  }

  function onClose() {
    props.onClose();
    props.formik.resetForm();
  }

  const fileFieldValue = props.formik.getFieldProps("file").value;

  return (
    <div>
      <DialogTitle className="modalTitle">
        {getLibelle("Ajouter une pièce justificative")}
      </DialogTitle>
      <DialogContent>
        <div className="inputsConteneur">
          <SelectField
            options={props.listeCategoriePJ}
            name="categoriePJ"
            label={getLibelle("Catégorie de la pièce justificative")}
          />
          <UploadFileField
            className="boutonUploadFile"
            name="file"
            iconBouton={
              <AttachFileOutlinedIcon
                fontSize="small"
                className="iconeTrombone"
              />
            }
            libelleBouton={getLibelle("Sélectionner un fichier")}
            hideInput={true}
            acceptFileTypes={FILE_TYPES}
            maxSizeKB={DIX_MILLE}
            onFileChange={onFileChange}
          />
          <div className="BlocPiecesJointes">
            {fileFieldValue &&
              getTableauPiecesJointes([fileFieldValue], supprimePieceJointe)}
          </div>
          <Bouton
            className="boutonValider"
            type="submit"
            aria-label="submitButton"
            onClick={onSubmitForm}
            disabled={!formulaireEstChange}
          >
            {getLibelle("Valider")}
          </Bouton>
        </div>
      </DialogContent>
      <DialogActions>
        <Bouton onClick={onClose}>{getLibelle("Fermer")}</Bouton>
      </DialogActions>
    </div>
  );
};

export default connect<ContenuModalAjoutPieceJustificativeProps>(
  ContenuModalAjoutPieceJustificative
);
