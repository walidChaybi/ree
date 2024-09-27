import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { getLibelle } from "@util/Utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./scss/Message.scss";

const DURATION_BEFORE_CLOSE = 10000;

const getDurationForAutoClose = (autoClose?: number) =>
  autoClose ? autoClose : DURATION_BEFORE_CLOSE;

const toString = (messages: string[]) => {
  return messages
    .map(message => message + "\n")
    .toString()
    .replace(/,/g, "");
};

const infoTitle = getLibelle("Information");
const successTitle = getLibelle("Succès");
const warnTitle = getLibelle("Attention");
const errorTitle = getLibelle("Erreur");

export const TOASTCONTAINER_PRINCIPAL = "toastContainer-principal";

const messageManager = {
  showErrorAndClose: (
    errorMessage: string,
    containerId = TOASTCONTAINER_PRINCIPAL,
    autoClose?: number
  ) => {
    toast(
      <div className="message-manager">
        <Alert severity="error">
          <AlertTitle>{errorTitle}</AlertTitle>
          {errorMessage}
        </Alert>
      </div>,

      {
        autoClose: getDurationForAutoClose(autoClose),
        closeButton: false,
        hideProgressBar: false,
        className: "error",
        containerId
      }
    );
  },

  showError: (errorMessage: string, containerId = TOASTCONTAINER_PRINCIPAL) => {
    toast(
      <div className="message-manager error">
        <Alert severity="error">
          <AlertTitle>{errorTitle}</AlertTitle>
          {errorMessage}
        </Alert>
      </div>,
      {
        autoClose: false,
        closeButton: true,
        hideProgressBar: true,
        className: "error",
        containerId
      }
    );
  },

  showErrors: (
    errorMessage: string[],
    containerId = TOASTCONTAINER_PRINCIPAL
  ) => {
    const htmlErrorMessage = errorMessage
      .map(message => message + "\n")
      .toString()
      .replace(/,/g, "");

    toast(
      <div className="message-manager">
        <Alert severity="error">
          <AlertTitle>{errorTitle}</AlertTitle>
          {htmlErrorMessage}
        </Alert>
      </div>,
      {
        autoClose: false,
        closeButton: true,
        hideProgressBar: true,
        className: "error",
        containerId
      }
    );
  },

  showSuccessAndClose: (
    successMessage: string,
    containerId = TOASTCONTAINER_PRINCIPAL,
    autoClose?: number
  ) => {
    toast(
      <div className="message-manager">
        <Alert severity="success">
          <AlertTitle>{successTitle}</AlertTitle>
          {successMessage}
        </Alert>
      </div>,
      {
        autoClose: getDurationForAutoClose(autoClose),
        closeButton: false,
        hideProgressBar: false,
        className: "success",
        containerId
      }
    );
  },

  showSuccess: (
    successMessage: string,
    containerId = TOASTCONTAINER_PRINCIPAL
  ) => {
    toast(
      <div className="message-manager">
        <Alert severity="success">
          <AlertTitle>{successTitle}</AlertTitle>
          {successMessage}
        </Alert>
      </div>,
      {
        autoClose: false,
        closeButton: true,
        hideProgressBar: true,
        className: "success",
        containerId
      }
    );
  },

  showSuccesses: (
    successMessage: string[],
    containerId = TOASTCONTAINER_PRINCIPAL
  ) => {
    const htmlErrorMessage = successMessage
      .map(message => message + "\n")
      .toString()
      .replace(/,/g, "");

    toast(
      <div className="message-manager">
        <Alert severity="success">
          <AlertTitle>{successTitle}</AlertTitle>
          {htmlErrorMessage}
        </Alert>
      </div>,
      {
        autoClose: false,
        closeButton: true,
        hideProgressBar: true,
        className: "success",
        containerId
      }
    );
  },

  showInfoAndClose: (
    infoMessage: string,
    containerId = TOASTCONTAINER_PRINCIPAL,
    autoClose?: number
  ) => {
    toast(
      <div className="message-manager">
        <Alert severity="info">
          <AlertTitle>{infoTitle}</AlertTitle>
          {infoMessage}
        </Alert>
      </div>,

      {
        autoClose: getDurationForAutoClose(autoClose),
        closeButton: false,
        hideProgressBar: false,
        className: "info",
        containerId
      }
    );
  },

  showInfo: (infoMessage: string, containerId = TOASTCONTAINER_PRINCIPAL) => {
    toast(
      <div className="message-manager">
        <Alert severity="info">
          <AlertTitle>{infoTitle}</AlertTitle>
          {infoMessage}
        </Alert>
      </div>,
      {
        autoClose: false,
        closeButton: true,
        hideProgressBar: true,
        className: "info",
        containerId
      }
    );
  },

  showInfos: (
    infoMessages: string[],
    containerId = TOASTCONTAINER_PRINCIPAL
  ) => {
    const message = toString(infoMessages);

    toast(
      <div className="message-manager error">
        <Alert severity="info">
          <AlertTitle>{infoTitle}</AlertTitle>
          {message}
        </Alert>
      </div>,
      {
        autoClose: false,
        closeButton: true,
        hideProgressBar: true,
        className: "info",
        containerId
      }
    );
  },

  showWarningAndClose: (
    warningMessage: string,
    containerId = TOASTCONTAINER_PRINCIPAL,
    autoClose?: number
  ) => {
    toast(
      <div className="message-manager">
        <Alert severity="warning">
          <AlertTitle>{warnTitle}</AlertTitle>
          {warningMessage}
        </Alert>
      </div>,

      {
        autoClose: getDurationForAutoClose(autoClose),
        closeButton: false,
        hideProgressBar: false,
        className: "warning",
        containerId
      }
    );
  },

  showWarning: (
    warningMessage: string,
    containerId = TOASTCONTAINER_PRINCIPAL
  ) => {
    toast(
      <div className="message-manager">
        <Alert severity="warning">
          <AlertTitle>{warnTitle}</AlertTitle>
          {warningMessage}
        </Alert>
      </div>,
      {
        autoClose: false,
        closeButton: true,
        hideProgressBar: true,
        className: "warning",
        containerId
      }
    );
  },

  showWarnings: (
    warningMessages: string[],
    containerId = TOASTCONTAINER_PRINCIPAL
  ) => {
    const message = toString(warningMessages);

    toast(
      <div className="message-manager">
        <Alert severity="warning">
          <AlertTitle>{warnTitle}</AlertTitle>
          {message}
        </Alert>
      </div>,
      {
        autoClose: false,
        closeButton: true,
        hideProgressBar: true,
        className: "warning",
        containerId
      }
    );
  }
};

export default messageManager;
