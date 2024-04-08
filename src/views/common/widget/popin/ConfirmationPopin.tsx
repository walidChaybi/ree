import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import React, { useEffect, useState } from "react";

export interface IBoutonPopin {
  label: string;
  action: () => void;
  color?: string;
}

export interface ConfirmationPopinProps {
  isOpen: boolean;
  messages?: string[];
  boutons?: IBoutonPopin[];
  title?: string;
  disablePortal?: boolean;
}

export const ConfirmationPopin: React.FC<ConfirmationPopinProps> = ({
  isOpen,
  messages,
  boutons,
  title,
  disablePortal = false
}) => {
  const [messagesPopin, setMessagesPopin] = useState<string[]>();

  useEffect(() => {
    if (messages?.length) {
      setMessagesPopin(messages);
    }
  }, [messages, isOpen]);

  return (
    <Dialog
      disablePortal={disablePortal}
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && <DialogTitle id="alert-dialog-title">title</DialogTitle>}
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
              <Bouton
                onClick={bouton.action}
                color={bouton.color ? bouton.color : "primary"}
                key={`boutonPopin${idx}`}
                aria-label={`confirmation ${bouton.label}`}
              >
                {bouton.label}
              </Bouton>
            );
          })}
      </DialogActions>
    </Dialog>
  );
};
