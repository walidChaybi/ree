import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import React from "react";
import { RMCActeInscription } from "../../../../composants/pages/rmc/formulaire/RMCActeInscription";
import { RMCActeInscription as RMCActeInscriptionOld } from "../acteInscription/RMCActeInscription";
import "./scss/PopinNouvelleRMCActeInscription.scss";

interface PopinNouvelleRMCActeInscriptionProps {
  open: boolean;
  setPopinAffichee: (affichee: boolean) => void;
  nouvelleRMCActeInscription: (values: any) => void;
  titulaires?: ITitulaireRequete[];
}

export const PopinNouvelleRMCActeInscription: React.FC<PopinNouvelleRMCActeInscriptionProps> = props => {
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
          size="large"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {gestionnaireFeatureFlag.estActif(FeatureFlag.FF_UTILISER_NOUVELLE_RMC) ? (
          <RMCActeInscription onSubmit={props.nouvelleRMCActeInscription} />
        ) : (
          <RMCActeInscriptionOld
            onSubmit={props.nouvelleRMCActeInscription}
            titulaires={props.titulaires}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
