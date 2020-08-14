import React from "react";
import { Snackbar, SnackbarOrigin } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

interface SuccessPopinProps {
  message?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const SuccessPopin: React.FC<SuccessPopinProps> = ({
  message,
  isOpen,
  setIsOpen,
}) => {
  const position: SnackbarOrigin = {
    vertical: "top",
    horizontal: "center",
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={position}
      open={isOpen && message !== undefined}
      onClose={handleClose}
      message="I love snacks"
    >
      <MuiAlert elevation={6} variant="filled" severity="success">
        {message}
      </MuiAlert>
    </Snackbar>
  );
};
