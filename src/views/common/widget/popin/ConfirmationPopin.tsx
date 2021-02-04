import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from "@material-ui/core";
import { Button } from "reakit/Button";

export interface ConfirmationPopinProps {
  isOpen: boolean;
  message: string;
  onYes: () => void;
  onNo: () => void;
  title?: string;
  labelOui?: string;
  labelNon?: string;
}

export const ConfirmationPopin: React.FC<ConfirmationPopinProps> = ({
  isOpen,
  message,
  onYes,
  onNo,
  title,
  labelOui,
  labelNon
}) => {
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && <DialogTitle id="alert-dialog-title">title</DialogTitle>}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onNo} color="primary">
          {labelNon ? labelNon : "Non"}
        </Button>
        <Button onClick={onYes} color="primary" autoFocus>
          {labelOui ? labelOui : "Oui"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
