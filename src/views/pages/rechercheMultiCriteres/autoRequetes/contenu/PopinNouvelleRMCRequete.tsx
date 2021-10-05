import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { ICriteresRMCRequete } from "../../../../../model/rmc/requete/ICriteresRMCRequete";
import { IRMCRequete } from "../../../../../model/rmc/requete/IRMCRequete";
import { RMCRequeteForm } from "../../requete/RMCRequeteForm";
import "./../scss/PopinNouvelleRMCRequete.scss";

interface PopinNouvelleRMCRequeteProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
  setNouvelleRMCRequete: React.Dispatch<React.SetStateAction<boolean>>;
  setValuesRMCRequete: React.Dispatch<React.SetStateAction<IRMCRequete>>;
  setCriteresRechercheRequete: React.Dispatch<
    React.SetStateAction<ICriteresRMCRequete | undefined>
  >;
}

export const PopinNouvelleRMCRequete: React.FC<PopinNouvelleRMCRequeteProps> = ({
  open,
  onClose,
  setNouvelleRMCRequete,
  setValuesRMCRequete,
  setCriteresRechercheRequete
}) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <Dialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      open={open}
      className="PopinNouvelleRMCRequete"
    >
      <DialogTitle>
        <IconButton
          aria-label="CloseButtonNouvelleRMCRequete"
          className="CloseButtonNouvelleRMCRequete"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <RMCRequeteForm
          closePopIn={handleClose}
          setNouvelleRMCRequete={setNouvelleRMCRequete}
          setValuesRMCRequete={setValuesRMCRequete}
          setCriteresRechercheRequete={setCriteresRechercheRequete}
        />
      </DialogContent>
    </Dialog>
  );
};
