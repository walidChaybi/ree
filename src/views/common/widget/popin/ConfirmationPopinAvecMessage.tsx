import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React from "react";
import "./scss/ConfirmationPopinAvecMessage.scss";

interface IBoutonPopin {
  label: string;
  action: () => void;
  color?: string;
  isDisabled?: boolean;
  disabled?: boolean;
}

interface ConfirmationPopinAvecMessageProps {
  isOpen: boolean;
  messages?: string[];
  boutons?: IBoutonPopin[];
  title?: string;
  disablePortal?: boolean;
  handleChangeText: (e: any) => void;
  messageErreur?: string;
  message?: string;
}

const nbRows = 10;

export const ConfirmationPopinAvecMessage: React.FC<ConfirmationPopinAvecMessageProps> = ({
  isOpen,
  messages,
  boutons,
  title,
  disablePortal = false,
  handleChangeText,
  messageErreur,
  message
}) => {
  return (
    <Dialog
      disablePortal={disablePortal}
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="ConfirmationPopinAvecMessage"
      data-testid="popinConfirmationEtMessage"
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      <DialogContent>
        <label>
          {"Message d'information"}
          <textarea
            name="textarea"
            value={message}
            onChange={handleChangeText}
            className="textarea"
            rows={nbRows}
            placeholder={"Saisir un message"}
            aria-label={"Texte pour saisir le message d'information retour sdanf"}
          ></textarea>
        </label>

        {messageErreur && <span className="messageErreur">{messageErreur}</span>}
      </DialogContent>
      <DialogActions>
        {boutons &&
          boutons.map((bouton: IBoutonPopin, idx: number) => {
            return (
              <BoutonDoubleSubmit
                onClick={bouton.action}
                color={bouton.color ? bouton.color : "primary"}
                key={`boutonPopin${idx}`}
                aria-label={`confirmation ${bouton.label}`}
                disabled={bouton.isDisabled && bouton.disabled}
              >
                {bouton.label}
              </BoutonDoubleSubmit>
            );
          })}
      </DialogActions>
    </Dialog>
  );
};
