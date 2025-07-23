import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import React from "react";
import BoutonIcon from "../../../../composants/commun/bouton/BoutonIcon";
import { RMCActeInscription } from "../../../../composants/pages/rmc/formulaire/RMCActeInscription";
import { RMCActeInscription as RMCActeInscriptionOld } from "../acteInscription/RMCActeInscription";

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
      PaperProps={{
        style: {
          maxWidth: "100%"
        }
      }}
    >
      <DialogContent>
        <BoutonIcon
          aria-label="bouton-fermeture-popin-rmc"
          className="absolute right-4 top-3 w-[38,25px]"
          styleBouton="suppression"
          onClick={handleClose}
          iconeSeule
        >
          <CloseIcon />
        </BoutonIcon>
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
