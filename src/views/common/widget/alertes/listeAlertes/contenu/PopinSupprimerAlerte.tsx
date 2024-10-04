import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { getLibelle } from "@util/Utils";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React from "react";
import "../scss/PopinSupprimerAlerte.scss";

export interface PopinSupprimerAlerteProps {
  open: boolean;
  onClosePopin: () => void;
  onSubmit: () => void;
}

export const PopinSupprimerAlerte: React.FC<PopinSupprimerAlerteProps> = ({
  open,
  onClosePopin,
  onSubmit
}) => {
  const onCancelClick = (): void => {
    onClosePopin();
  };

  return (
    <Dialog
      disablePortal={true}
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        {getLibelle("Etes-vous sûr de vouloir supprimer cette alerte ?")}
      </DialogContent>
      <DialogActions>
        <BoutonDoubleSubmit type="button" onClick={onCancelClick}>
          {getLibelle("Annuler")}
        </BoutonDoubleSubmit>
        <BoutonDoubleSubmit type="button" onClick={onSubmit}>
          {getLibelle("Valider")}
        </BoutonDoubleSubmit>
      </DialogActions>
    </Dialog>
  );
};
