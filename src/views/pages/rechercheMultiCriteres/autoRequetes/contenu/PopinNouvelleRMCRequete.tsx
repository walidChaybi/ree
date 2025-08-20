import { ETypeRequete } from "@model/requete/enum/TypeRequete";
import { ICriteresRMCRequete } from "@model/rmc/requete/ICriteresRMCRequete";
import { IRMCRequeteForm } from "@model/rmc/requete/IRMCRequete";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { MdClose } from "react-icons/md";
import { RMCRequeteForm } from "../../requete/RMCRequeteForm";
import "./../scss/PopinNouvelleRMCRequete.scss";
interface PopinNouvelleRMCRequeteProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
  setValuesRMCRequete: React.Dispatch<React.SetStateAction<IRMCRequeteForm<keyof typeof ETypeRequete | ""> | null>>;
  setCriteresRechercheRequete: React.Dispatch<React.SetStateAction<ICriteresRMCRequete | undefined>>;
}

export const PopinNouvelleRMCRequete: React.FC<PopinNouvelleRMCRequeteProps> = ({
  open,
  onClose,
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
          aria-label="Fermer nouvelle requête RMC"
          className="CloseButtonNouvelleRMCRequete"
          onClick={handleClose}
          size="large"
        >
          <MdClose aria-hidden />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <RMCRequeteForm
          closePopIn={handleClose}
          setValuesRMCRequete={setValuesRMCRequete}
          setCriteresRechercheRequete={setCriteresRechercheRequete}
        />
      </DialogContent>
    </Dialog>
  );
};
