import { ICriteresRMCRequete } from "@model/rmc/requete/ICriteresRMCRequete";
import { IRMCRequete } from "@model/rmc/requete/IRMCRequete";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import React from "react";
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

export const PopinNouvelleRMCRequete: React.FC<
  PopinNouvelleRMCRequeteProps
> = ({
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
          size="large"
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
