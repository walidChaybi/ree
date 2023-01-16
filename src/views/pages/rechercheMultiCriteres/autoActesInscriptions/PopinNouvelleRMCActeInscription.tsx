import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { RMCActeInscriptionForm } from "../acteInscription/RMCActeInscriptionForm";
import "./scss/PopinNouvelleRMCActeInscription.scss";

interface PopinNouvelleRMCActeInscriptionProps {
  open: boolean;
  setPopinAffichee: (affichee: boolean) => void;
  nouvelleRMCActeInscription: (values: any) => void;
}

export const PopinNouvelleRMCActeInscription: React.FC<
  PopinNouvelleRMCActeInscriptionProps
> = ({ open, setPopinAffichee, nouvelleRMCActeInscription }) => {
  const handleClose = () => {
    setPopinAffichee(false);
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
          size="large">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <RMCActeInscriptionForm onSubmit={nouvelleRMCActeInscription} />
      </DialogContent>
    </Dialog>
  );
};
