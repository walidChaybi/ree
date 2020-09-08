import * as React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./sass/Message.scss";
import { Alert, AlertTitle } from "@material-ui/lab";
import { getText } from "./../widget/Text";

const DURATION_BEFORE_CLOSE = 3000;
const DURATION_BEFORE_CLOSE_ERROR = 5000;

const getDurationForAutoClose = (autoClose?: number) =>
  autoClose ? autoClose : DURATION_BEFORE_CLOSE;

const getDurationErrorForAutoClose = (autoClose?: number) =>
  autoClose ? autoClose : DURATION_BEFORE_CLOSE_ERROR;

const messageManager = {
  showErrorAndClose: (errorMessage: string, autoClose?: number) => {
    toast(
      <div className="message-manager">
        <Alert severity="error">
          <AlertTitle>{getText("messageManager.error")}</AlertTitle>
          {errorMessage}
        </Alert>
      </div>,

      {
        autoClose: getDurationErrorForAutoClose(autoClose),
        closeButton: false,
        hideProgressBar: false,
        className: "error"
      }
    );
  },

  showError: (errorMessage: string) => {
    toast(
      <div className="message-manager error">
        <Alert severity="error">
          <AlertTitle>{getText("messageManager.error")}</AlertTitle>
          {errorMessage}
        </Alert>
      </div>,
      {
        autoClose: false,
        closeButton: true,
        hideProgressBar: true,
        className: "error"
      }
    );
  },

  showErrors: (errorMessage: string[]) => {
    const htmlErrorMessage = errorMessage
      .map((message) => message + "\n")
      .toString()
      .replace(/,/g, "");

    toast(
      <div className="message-manager">
        <Alert severity="error">
          <AlertTitle>{getText("messageManager.error")}</AlertTitle>
          {htmlErrorMessage}
        </Alert>
      </div>,
      {
        autoClose: false,
        closeButton: true,
        hideProgressBar: true,
        className: "error"
      }
    );
  },

  showSuccessAndClose: (successMessage: string, autoClose?: number) => {
    toast(
      <div className="message-manager">
        <Alert severity="success">
          <AlertTitle>{getText("messageManager.success")}</AlertTitle>
          {successMessage}
        </Alert>
      </div>,
      {
        autoClose: getDurationForAutoClose(autoClose),
        closeButton: false,
        hideProgressBar: false,
        className: "success"
      }
    );
  },

  showSuccess: (successMessage: string) => {
    toast(
      <div className="message-manager">
        <Alert severity="success">
          <AlertTitle>{getText("messageManager.success")}</AlertTitle>
          {successMessage}
        </Alert>
      </div>,
      {
        autoClose: false,
        closeButton: true,
        hideProgressBar: true,
        className: "success"
      }
    );
  },

  showSuccesses: (successMessage: string[]) => {
    const htmlErrorMessage = successMessage
      .map((message) => message + "\n")
      .toString()
      .replace(/,/g, "");

    toast(
      <div className="message-manager">
        <Alert severity="success">
          <AlertTitle>{getText("messageManager.success")}</AlertTitle>
          {htmlErrorMessage}
        </Alert>
      </div>,
      {
        autoClose: false,
        closeButton: true,
        hideProgressBar: true,
        className: "success"
      }
    );
  },

  showInfoAndClose: (infoMessage: string, autoClose?: number) => {
    toast(
      <div className="message-manager">
        <Alert severity="info">
          <AlertTitle>{getText("messageManager.info")}</AlertTitle>
          {infoMessage}
        </Alert>
      </div>,

      {
        autoClose: getDurationForAutoClose(autoClose),
        closeButton: false,
        hideProgressBar: false,
        className: "info"
      }
    );
  },

  showInfo: (infoMessage: string) => {
    toast(
      <div className="message-manager">
        <Alert severity="info">
          <AlertTitle>{getText("messageManager.info")}</AlertTitle>
          {infoMessage}
        </Alert>
      </div>,
      {
        autoClose: false,
        closeButton: true,
        hideProgressBar: true,
        className: "info"
      }
    );
  },

  showInfos: (infoMessage: string[]) => {
    const htmlErrorMessage = infoMessage
      .map((message) => message + "\n")
      .toString()
      .replace(/,/g, "");

    toast(
      <div className="message-manager error">
        <Alert severity="info">
          <AlertTitle>{getText("messageManager.info")}</AlertTitle>
          {htmlErrorMessage}
        </Alert>
      </div>,
      {
        autoClose: false,
        closeButton: true,
        hideProgressBar: true,
        className: "info"
      }
    );
  },

  showWarningAndClose: (warningMessage: string, autoClose?: number) => {
    toast(
      <div className="message-manager">
        <Alert severity="warning">
          <AlertTitle>{getText("messageManager.warning")}</AlertTitle>
          {warningMessage}
        </Alert>
      </div>,

      {
        autoClose: getDurationForAutoClose(autoClose),
        closeButton: false,
        hideProgressBar: false,
        className: "warning"
      }
    );
  },

  showWarning: (warningMessage: string) => {
    toast(
      <div className="message-manager">
        <Alert severity="warning">
          <AlertTitle>{getText("messageManager.warning")}</AlertTitle>
          {warningMessage}
        </Alert>
      </div>,
      {
        autoClose: false,
        closeButton: true,
        hideProgressBar: true,
        className: "warning"
      }
    );
  },

  showWarnings: (infoMessage: string[]) => {
    const htmlErrorMessage = infoMessage
      .map((message) => message + "\n")
      .toString()
      .replace(/,/g, "");

    toast(
      <div className="message-manager">
        <Alert severity="warning">
          <AlertTitle>{getText("messageManager.warning")}</AlertTitle>
          {htmlErrorMessage}
        </Alert>
      </div>,
      {
        autoClose: false,
        closeButton: true,
        hideProgressBar: true,
        className: "warning"
      }
    );
  }
};

export default messageManager;
