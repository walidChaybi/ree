import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import React from "react";
import { Button } from "reakit/Button";

export interface IBoutonPopin {
  label: string;
  action: () => void;
  color?: string;
}

export interface ConfirmationPopinProps {
  isOpen: boolean;
  messages: string[];
  boutons?: IBoutonPopin[];
  title?: string;
}

export const ConfirmationPopin: React.FC<ConfirmationPopinProps> = ({
  isOpen,
  messages,
  boutons,
  title
}) => {
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && <DialogTitle id="alert-dialog-title">title</DialogTitle>}
      <DialogContent>
        {messages.map((msg: string, idx: number) => {
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
              <Button
                onClick={bouton.action}
                color={bouton.color ? bouton.color : "primary"}
                key={`boutonPopin${idx}`}
              >
                {bouton.label}
              </Button>
            );
          })}
      </DialogActions>
    </Dialog>
  );
};
