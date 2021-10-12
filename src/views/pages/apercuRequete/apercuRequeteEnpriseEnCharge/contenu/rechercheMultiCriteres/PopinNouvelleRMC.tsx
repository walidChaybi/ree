import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { IRMCActeInscription } from "../../../../../../model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { ICriteresRecherche } from "../../../../rechercheMultiCriteres/acteInscription/hook/RMCInscriptionApiHook";
import { RMCActeInscriptionForm } from "../../../../rechercheMultiCriteres/acteInscription/RMCActeInscriptionForm";
import "./scss/PopinNouvelleRMC.scss";

interface PopinNouvelleRMCProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
  setValuesRMC: React.Dispatch<React.SetStateAction<IRMCActeInscription>>;
  setNouvelleRecherche: React.Dispatch<React.SetStateAction<boolean>>;
  setCriteresRechercheActe: React.Dispatch<
    React.SetStateAction<ICriteresRecherche | undefined>
  >;
  setCriteresRechercheInscription: React.Dispatch<
    React.SetStateAction<ICriteresRecherche | undefined>
  >;
}

export const PopinNouvelleRMC: React.FC<PopinNouvelleRMCProps> = props => {
  const handleClose = () => {
    props.onClose(false);
  };

  return (
    <Dialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      open={props.open}
      className="PopinNouvelleRMC"
    >
      <DialogTitle>
        <IconButton
          aria-label="CloseButtonNouvelleRMC"
          className="CloseButtonNouvelleRMC"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <RMCActeInscriptionForm
          setValuesRMC={props.setValuesRMC}
          setNouvelleRecherche={props.setNouvelleRecherche}
          setCriteresRechercheActe={props.setCriteresRechercheActe}
          setCriteresRechercheInscription={
            props.setCriteresRechercheInscription
          }
          closePopIn={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};
