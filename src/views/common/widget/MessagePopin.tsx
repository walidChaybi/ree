import React, { useEffect } from "react";
import { Snackbar, SnackbarOrigin } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import "./sass/MessagePopin.scss";
interface MessagePopinProps {
  message?: string;
  messageType: PopinMessageType;
  isOpen: boolean;
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
}) => {
  const position: SnackbarOrigin = {
    vertical: "top",
    horizontal: "center",
  };

  const [isPopinOpen, setIsPopinOpen] = React.useState<boolean>(isOpen);

  useEffect(() => {
    setIsPopinOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsPopinOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={position}
      open={isPopinOpen && message !== undefined}
      onClose={handleClose}
      className={`MessagePopin ${getPopinClass(messageType)}`}
      data-testid={`popin-${messageType}`}
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
      return "SuccessPopin";
    case PopinMessageType.Error:
      return "ErrorPopin";
    case PopinMessageType.Warning:
      return "WarningPopin";
    default:
      return "InfoPopin";
  }
}
