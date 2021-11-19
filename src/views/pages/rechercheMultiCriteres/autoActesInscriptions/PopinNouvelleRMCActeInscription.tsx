import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { RMCActeInscriptionForm } from "../acteInscription/RMCActeInscriptionForm";
import "./scss/PopinNouvelleRMCActeInscription.scss";

interface PopinNouvelleRMCActeInscriptionProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
  nouvelleRMCActeInscription: (values: any) => void;
}

export const PopinNouvelleRMCActeInscription: React.FC<PopinNouvelleRMCActeInscriptionProps> = ({
  open,
  onClose,
  nouvelleRMCActeInscription
}) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <Dialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      open={open}
      className="PopinNouvelleRMCActeInscription"
    >
      <DialogTitle>
        <IconButton
          aria-label="CloseButtonNouvelleRMCActeInscription"
          className="CloseButtonNouvelleRMCActeInscription"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <RMCActeInscriptionForm
          onSubmit={nouvelleRMCActeInscription}
          closePopIn={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};
