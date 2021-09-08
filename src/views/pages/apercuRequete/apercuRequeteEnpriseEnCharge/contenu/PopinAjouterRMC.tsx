import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { stockageDonnees } from "../../../../common/util/stockageDonnees";
import { Formulaire } from "../../../../common/widget/formulaire/Formulaire";
import {
  DefaultValuesRMCActeInscription,
  getFormDatesDebutFinAnnee,
  getFormTitulaire,
  getRegistreRepertoire,
  titreForm,
  ValidationSchemaRMCActeInscription
} from "../../../rechercheMultiCriteres/acteInscription/RMCActeInscriptionPage";
import RMCBoutons, {
  RMCBoutonsProps
} from "../../../rechercheMultiCriteres/boutons/RMCBoutons";
import "./../scss/PopinAjouterRMC.scss";

interface PopinAjouterRMCProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
}

export const PopinAjouterRMC: React.FC<PopinAjouterRMCProps> = ({
  open,
  onClose
}) => {
  const handleClose = () => {
    onClose(false);
  };
  const blocsForm: JSX.Element[] = [
    getFormTitulaire(),
    getRegistreRepertoire(),
    getFormDatesDebutFinAnnee()
  ];

  const onSubmit = () => {};

  const rappelCriteres = () => {
    return stockageDonnees.recupererCriteresRMCActeInspt();
  };

  const boutonsProps = {
    rappelCriteres
  } as RMCBoutonsProps;

  return (
    <Dialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      open={open}
      className="PopinAjouterRMC"
    >
      <DialogTitle>
        <IconButton
          data-testId="CloseButtonAjouterRMC"
          className="CloseButtonAjouterRMC"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Formulaire
          titre={titreForm}
          formDefaultValues={DefaultValuesRMCActeInscription}
          formValidationSchema={ValidationSchemaRMCActeInscription}
          onSubmit={onSubmit}
        >
          <div className="DeuxColonnes FormulaireRMCAI">{blocsForm}</div>
          <RMCBoutons {...boutonsProps} />
        </Formulaire>
      </DialogContent>
    </Dialog>
  );
};
