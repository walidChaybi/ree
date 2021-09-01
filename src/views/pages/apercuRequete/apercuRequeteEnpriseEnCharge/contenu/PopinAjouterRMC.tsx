import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { RMCActeInscriptionPage } from "../../../rechercheMultiCriteres/acteInscription/RMCActeInscriptionPage";
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
        <DialogContentText id="alert-dialog-description">
          <RMCActeInscriptionPage autoScroll={false} />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
