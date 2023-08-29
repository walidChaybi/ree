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
import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";

interface PopinNouvelleRMCActeInscriptionProps {
  open: boolean;
  setPopinAffichee: (affichee: boolean) => void;
  nouvelleRMCActeInscription: (values: any) => void;
  titulaires? : ITitulaireRequete[];
}

export const PopinNouvelleRMCActeInscription: React.FC<
  PopinNouvelleRMCActeInscriptionProps
> = props => {
  const handleClose = () => {
    props.setPopinAffichee(false);
  };

  return (
    <Dialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      open={props.open}
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
        <RMCActeInscriptionForm onSubmit={props.nouvelleRMCActeInscription} titulaires={props.titulaires}/>
      </DialogContent>
    </Dialog>
  );
};
