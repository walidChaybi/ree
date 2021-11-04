import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { IRMCActeInscription } from "../../../../../../model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import {
  NB_LIGNES_PAR_APPEL_ACTE,
  NB_LIGNES_PAR_APPEL_DEFAUT
} from "../../../../../common/widget/tableau/v2/TableauPaginationConstantes";
import { ICriteresRecherche } from "../../../../rechercheMultiCriteres/acteInscription/hook/RMCInscriptionApiHook";
import { RMCActeInscriptionForm } from "../../../../rechercheMultiCriteres/acteInscription/RMCActeInscriptionForm";
import "./scss/PopinNouvelleRMCActeInscription.scss";

interface PopinNouvelleRMCActeInscriptionProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
  setValuesRMCActeInscription: React.Dispatch<
    React.SetStateAction<IRMCActeInscription>
  >;
  setNouvelleRMCActeInscription: React.Dispatch<React.SetStateAction<boolean>>;
  setCriteresRechercheActe: React.Dispatch<
    React.SetStateAction<ICriteresRecherche | undefined>
  >;
  setCriteresRechercheInscription: React.Dispatch<
    React.SetStateAction<ICriteresRecherche | undefined>
  >;
}

export const PopinNouvelleRMCActeInscription: React.FC<PopinNouvelleRMCActeInscriptionProps> = ({
  open,
  onClose,
  setValuesRMCActeInscription,
  setNouvelleRMCActeInscription,
  setCriteresRechercheActe,
  setCriteresRechercheInscription
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
          setValuesRMCActeInscription={setValuesRMCActeInscription}
          setNouvelleRMCActeInscription={setNouvelleRMCActeInscription}
          setCriteresRechercheActe={setCriteresRechercheActe}
          setCriteresRechercheInscription={setCriteresRechercheInscription}
          closePopIn={handleClose}
          nbLignesParAppelActe={NB_LIGNES_PAR_APPEL_ACTE}
          nbLignesParAppelInscription={NB_LIGNES_PAR_APPEL_DEFAUT}
        />
      </DialogContent>
    </Dialog>
  );
};
