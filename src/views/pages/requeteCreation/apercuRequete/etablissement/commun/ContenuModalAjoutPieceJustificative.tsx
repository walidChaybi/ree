import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Option, Options } from "@util/Type";
import { DIX_MILLE } from "@util/Utils";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { SelectField } from "@widget/formulaire/champsSaisie/SelectField";
import UploadFileField from "@widget/formulaire/champsSaisie/UploadFileField";
import { getTableauPiecesJointes } from "@widget/formulaire/piecesJointes/PiecesJointes";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { connect } from "formik";
import { useEffect, useState } from "react";
import { MdOutlineAttachFile } from "react-icons/md";
import { Base64File, FILE_TYPES } from "../../../../../../utils/FileUtils";

interface ContenuModalProps {
  listeCategoriePJ: Options;
  onClose: () => void;
}
type ContenuModalAjoutPieceJustificativeProps = SubFormProps & ContenuModalProps;

const ContenuModalAjoutPieceJustificative: React.FC<ContenuModalAjoutPieceJustificativeProps> = props => {
  const [formulaireEstChange, setFormulaireEstChange] = useState<boolean>(false);

  useEffect(() => {
    if (props.formik.values.categoriePJ && props.formik.values.file) {
      setFormulaireEstChange(true);
    }
  }, [props.formik.values.categoriePJ, props.formik.values.file]);

  const onFileChange = (base64File: Base64File, type?: Option | undefined): void => {
    props.formik.setFieldValue("file", { base64File, type });
  };

  const supprimePieceJointe = () => {
    props.formik.setFieldValue("file", undefined);
  };

  const onSubmitForm = async () => {
    await props.formik.submitForm();
    setFormulaireEstChange(false);
  };

  const onClose = () => {
    props.onClose();
    props.formik.resetForm();
  };

  const fileFieldValue = props.formik.getFieldProps("file").value;

  return (
    <div>
      <DialogTitle className="modalTitle">Ajouter une pièce justificative</DialogTitle>
      <DialogContent>
        <div className="inputsConteneur">
          <SelectField
            options={props.listeCategoriePJ}
            name="categoriePJ"
            label="Catégorie de la pièce justificative"
          />
          <UploadFileField
            className="boutonUploadFile"
            name="file"
            iconBouton={
              <MdOutlineAttachFile
                className="iconeTrombone text-xl"
                aria-hidden
              />
            }
            libelleBouton="Sélectionner un fichier"
            hideInput={true}
            acceptFileTypes={FILE_TYPES}
            maxSizeKB={DIX_MILLE}
            onFileChange={onFileChange}
          />
          <div className="BlocPiecesJointes">{fileFieldValue && getTableauPiecesJointes([fileFieldValue], supprimePieceJointe)}</div>
          <BoutonDoubleSubmit
            className="boutonValider"
            type="submit"
            aria-label="submitButton"
            onClick={onSubmitForm}
            disabled={!formulaireEstChange}
          >
            Valider
          </BoutonDoubleSubmit>
        </div>
      </DialogContent>
      <DialogActions>
        <BoutonDoubleSubmit onClick={onClose}>Fermer</BoutonDoubleSubmit>
      </DialogActions>
    </div>
  );
};

export default connect<ContenuModalAjoutPieceJustificativeProps>(ContenuModalAjoutPieceJustificative);
