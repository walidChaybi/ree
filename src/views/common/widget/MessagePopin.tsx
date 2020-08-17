import React from "react";
import { Snackbar, SnackbarOrigin } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import "./sass/MessagePopin.scss";
interface MessagePopinProps {
  message?: string;
  messageType: PopinMessageType;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export enum PopinMessageType {
  Success = "success",
  Error = "error",
  Warning = "warning",
  Info = "info",
}

export const MessagePopin: React.FC<MessagePopinProps> = ({
  message,
  messageType,
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
      className={`MessagePopin ${getPopinClass(messageType)}`}
    >
      <MuiAlert elevation={6} variant="filled" severity={messageType}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

function getPopinClass(messageType: PopinMessageType): string {
  switch (messageType) {
    case PopinMessageType.Success:
      return "MessagePopin";
    case PopinMessageType.Error:
      return "ErrorPopin";
    case PopinMessageType.Warning:
      return "WarningPopin";
    default:
      return "InfoPopin";
  }
}
