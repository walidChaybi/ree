import { HTTP_PAYLOAD_TOO_LARGE, HTTP_REQUEST_TIME_OUT } from "@api/ApiManager";
import messageManager from "./messageManager";
import { storeRece } from "./storeRece";

export interface LogErrorMsg {
  messageUtilisateur?: string;
  error?: any;
  errorInfo?: React.ErrorInfo | string;
}

/**@deprecated fonction vétuste. à remplacer par une fonction typée*/
export function logError(logErrorMgs: LogErrorMsg) {
  if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
    logErrorOnConsole(logErrorMgs);
  }
  if (logErrorMgs.error?.status === HTTP_PAYLOAD_TOO_LARGE) {
    messageManager.showErrorAndClose(
      `La recherche multi-critères ramène trop de résultats, veuillez affiner vos critères.\n(${logErrorMgs.messageUtilisateur})`
    );
  } else if (logErrorMgs.error?.status === HTTP_REQUEST_TIME_OUT) {
    messageManager.showErrorAndClose(
      `Le service est momentanément indisponible, veuillez réessayer ultérieurement\n(${logErrorMgs.messageUtilisateur})`
    );
  } else if (logErrorMgs.messageUtilisateur) {
    const messageDuServeur = getMessageDuServeur(logErrorMgs);

    messageManager.showErrorAndClose(
      messageDuServeur ? `${logErrorMgs.messageUtilisateur}\n(${messageDuServeur})` : logErrorMgs.messageUtilisateur
    );
  }
}

function getMessageDuServeur(logErrorMgs: LogErrorMsg): string {
  if (logErrorMgs?.error?.message) {
    try {
      const objMessageServeur = JSON.parse(logErrorMgs?.error?.message);
      if (objMessageServeur?.errors) {
        return objMessageServeur?.errors[0]?.message;
      }
    } catch (e) {
      return "";
    }
  }
  return "";
}

function logErrorOnConsole(logErrorMgs: LogErrorMsg) {
  if (!storeRece.logErrorDesactive) {
    if (logErrorMgs) {
      console.error("Erreur inattendue: ", logErrorMgs.error);
      if (logErrorMgs.errorInfo) {
        console.error("Info erreur: ", logErrorMgs.errorInfo);
      }
    } else {
      console.error("Une erreur s'est produite");
    }
    if (process.env.NODE_ENV === "test") {
      throw new Error(logErrorMgs.messageUtilisateur);
    }
  }
}
