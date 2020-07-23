import * as React from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./sass/Message.scss";

const DURATION_BEFORE_CLOSE = 3000;

const getDurationForAutoClose = (autoClose?: number) =>
  autoClose ? autoClose : DURATION_BEFORE_CLOSE;

const messageManager = {
  showErrorAndClose: (errorMessage: string, autoClose?: number) => {
    //FIXME : CSS
    toast(
      <div className="block-attention">
        <div className="strong">ERROR :</div>

        {errorMessage}
      </div>,

      {
        autoClose: getDurationForAutoClose(autoClose),
        closeButton: false,
        hideProgressBar: true,
      }
    );
  },

  showErrorsAndClose: (errorMessage: string[]) => {
    //FIXME : CSS
    const htmlErrorMessage = errorMessage
      .map((message) => message + "\n")
      .toString()
      .replace(/,/g, "");

    toast(
      <div className="block-attention">
        <div className="strong">ERROR :</div>

        {htmlErrorMessage}
      </div>,

      { closeButton: false, hideProgressBar: true }
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
