import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import React from "react";
import { MdClose } from "react-icons/md";
import BoutonIcon from "../../../../composants/commun/bouton/BoutonIcon";
import RMCActeInscription from "../../../../composants/pages/rmc/formulaire/RMCActeInscription";
import { RMCContextProvider } from "../../../../contexts/RMCContextProvider";

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
          aria-label="Fermer popin rmc"
          className="absolute right-4 top-3 w-[38,25px]"
          styleBouton="suppression"
          onClick={handleClose}
          iconeSeule
        >
          <MdClose aria-hidden />
        </BoutonIcon>
        <RMCContextProvider>
          <RMCActeInscription onSubmit={props.nouvelleRMCActeInscription} />
        </RMCContextProvider>
      </DialogContent>
    </Dialog>
  );
};
