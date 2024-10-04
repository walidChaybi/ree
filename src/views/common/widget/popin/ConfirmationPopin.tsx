import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React, { useEffect, useState } from "react";

export interface IBoutonPopin {
  label: string;
  action: () => void;
  color?: string;
}

export interface ConfirmationPopinProps {
  estOuvert: boolean;
  messages?: string[];
  boutons?: IBoutonPopin[];
  titre?: string;
  disablePortal?: boolean;
}

export const ConfirmationPopin: React.FC<ConfirmationPopinProps> = ({
  estOuvert,
  messages,
  boutons,
  titre,
  disablePortal = false
}) => {
  const [messagesPopin, setMessagesPopin] = useState<string[]>();

  useEffect(() => {
    if (messages?.length) {
      setMessagesPopin(messages);
    }
  }, [messages, estOuvert]);

  return (
    <Dialog
      disablePortal={disablePortal}
      open={estOuvert}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {titre && <DialogTitle id="alert-dialog-title">{titre}</DialogTitle>}
      <DialogContent>
        {messagesPopin?.map((msg: string, idx: number) => {
          return (
            <DialogContentText
              id="alert-dialog-description"
              key={`message${idx}`}
            >
              {msg}
            </DialogContentText>
          );
        })}
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
              >
                {bouton.label}
              </BoutonDoubleSubmit>
            );
          })}
      </DialogActions>
    </Dialog>
  );
};
