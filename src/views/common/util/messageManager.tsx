import * as React from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./sass/Message.scss";

const DURATION_BEFORE_CLOSE = 3000;
const DURATION_BEFORE_CLOSE_ERROR = 5000;

const getDurationForAutoClose = (autoClose?: number) =>
  autoClose ? autoClose : DURATION_BEFORE_CLOSE;

const getDurationErrorForAutoClose = (autoClose?: number) =>
  autoClose ? autoClose : DURATION_BEFORE_CLOSE_ERROR;

const messageManager = {
  showErrorAndClose: (errorMessage: string, autoClose?: number) => {
    //FIXME : CSS
    toast(
      <div className="message-manager">
        <div className="error">ERROR :</div>

        <p className="error">{errorMessage}</p>
      </div>,

      {
        autoClose: getDurationErrorForAutoClose(autoClose),
        closeButton: false,
        hideProgressBar: false,
      }
    );
  },

  showError: (errorMessage: string) => {
    //FIXME : CSS
    toast(
      <div className="message-manager">
        <div className="error">ERROR :</div>

        <p className="error">{errorMessage}</p>
      </div>,

      {
        autoClose: false,
        closeButton: true,
        hideProgressBar: true,
      }
    );
  },

  showErrors: (errorMessage: string[]) => {
    //FIXME : CSS
    const htmlErrorMessage = errorMessage
      .map((message) => message + "\n")
      .toString()
      .replace(/,/g, "");

    toast(
      <div className="message-manager">
        <div className="error">ERROR :</div>
        <p className="error">{htmlErrorMessage}</p>
      </div>,

      { autoClose: false, closeButton: true, hideProgressBar: true }
    );
  },

  showSuccessAndClose: (successMessage: string, autoClose?: number) => {
    toast(
      <div className="message-manager">
        <p className="success">{successMessage}</p>
      </div>,

      {
        autoClose: getDurationForAutoClose(autoClose),
        closeButton: false,
        hideProgressBar: false,
      }
    );
  },

  showInfoAndClose: (successMessage: string, autoClose?: number) => {
    //FIXME : CSS
    toast(
      <div className="block-information">
        <i className="maificon maificon-info" />

        {successMessage}
      </div>,

      {
        autoClose: getDurationForAutoClose(autoClose),
        closeButton: false,
        hideProgressBar: true,
      }
    );
  },
};

export default messageManager;
