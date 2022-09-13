import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import { getLibelle } from "@util/Utils";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import React from "react";

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
        {getLibelle("Etes-vous sur de vouloir supprimer cette alerte ?")}
      </DialogContent>
      <DialogActions>
        <Bouton type="button" onClick={onCancelClick}>
          {getLibelle("Annuler")}
        </Bouton>
        <Bouton type="button" onClick={onSubmit}>
          {getLibelle("Valider")}
        </Bouton>
      </DialogActions>
    </Dialog>
  );
};
