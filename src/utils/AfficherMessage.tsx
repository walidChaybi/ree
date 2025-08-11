import { TErreurApi } from "@model/api/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../scss/Message.scss";

const DUREE_AVANT_FERMETURE = 10000;

const titreMessageInformation = "Information";
const titreMessageSucces = "Succès";
const titreMessageAttention = "Attention";
const titreMessageErreur = "Erreur";

export const TOASTCONTAINER_PRINCIPAL = "toastContainer-principal";

type TMessageParams = {
  idConteneur?: string;
  fermetureAuto?: boolean;
};

type TMessageErreurParams = TMessageParams & {
  erreurs?: TErreurApi[];
};

export const estTableauErreurApi = (data: unknown): data is TErreurApi[] => {
  return Array.isArray(data) && data.every(item => typeof item?.["code"] === "string");
};

const toastMessage = (titre: string, message?: string | string[], erreurs?: TErreurApi[]) => {
  return (
    <div className="w-full text-center">
      <div className="mb-3 text-lg font-bold">{titre}</div>

      {message && (Array.isArray(message) ? message.map(msg => <div key={`msg-${msg}`}>{msg}</div>) : <div>{message}</div>)}

      {erreurs && erreurs.length > 0 && (
        <p className="mb-1 text-center">
          Codes d’erreur :<br />
          {erreurs
            .filter(erreur => erreur.code)
            .map(erreur => erreur.code)
            .join(", ")}
        </p>
      )}
    </div>
  );
};

const AfficherMessage = {
  erreur: (messages: string | string[], params?: TMessageErreurParams) => {
    const { erreurs, idConteneur = TOASTCONTAINER_PRINCIPAL, fermetureAuto } = params || {};

    toast.error(toastMessage(titreMessageErreur, messages, erreurs), {
      className: "error",
      autoClose: fermetureAuto ? DUREE_AVANT_FERMETURE : false,
      containerId: idConteneur
    });
  },

  succes: (messages: string | string[], params?: TMessageParams) => {
    const { idConteneur = TOASTCONTAINER_PRINCIPAL, fermetureAuto } = params || {};

    toast.success(toastMessage(titreMessageSucces, messages), {
      className: "success",
      autoClose: fermetureAuto ? DUREE_AVANT_FERMETURE : false,
      hideProgressBar: false,
      containerId: idConteneur
    });
  },

  info: (messages: string | string[], params?: TMessageParams) => {
    const { idConteneur = TOASTCONTAINER_PRINCIPAL, fermetureAuto } = params || {};

    toast.info(toastMessage(titreMessageInformation, messages), {
      className: "info",
      autoClose: fermetureAuto ? DUREE_AVANT_FERMETURE : false,
      hideProgressBar: false,
      containerId: idConteneur
    });
  },

  avertissement: (messages: string | string[], params?: TMessageParams) => {
    const { idConteneur = TOASTCONTAINER_PRINCIPAL, fermetureAuto } = params || {};

    toast.warning(toastMessage(titreMessageAttention, messages), {
      className: "warning",
      autoClose: fermetureAuto ? DUREE_AVANT_FERMETURE : false,
      hideProgressBar: false,
      containerId: idConteneur
    });
  }
};

export default AfficherMessage;
